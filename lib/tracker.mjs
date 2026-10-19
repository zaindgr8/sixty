// Database persistence for Sixty Tracker (/tracker).
// Stores tracker state (daily checklist progress, client count, weekly goals) in Supabase.
// Uses app_settings key-value store, shared across devices and teammates.

const DEFAULT_WEEKS = [3, 7, 13, 20, 28, 37, 47, 59, 73, 88, 100];
const TRACKER_KEY = 'sixty_tracker';

function getCredentials(env = process.env) {
  const url = (env.SUPABASE_URL || '').replace(/\/$/, '');
  const key = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_KEY || '';
  return { url, key };
}

/** Default empty tracker structure */
export function defaultTrackerState() {
  return {
    days: {},
    clients: {},
    weeks: [...DEFAULT_WEEKS],
    updated_at: new Date().toISOString(),
  };
}

/**
 * Fetch current tracker state from Supabase database.
 */
export async function getTracker({ env = process.env } = {}) {
  const { url, key } = getCredentials(env);
  if (!url || !key) {
    return { status: 500, body: { ok: false, error: 'Database credentials not configured' } };
  }

  try {
    const res = await fetch(`${url}/rest/v1/app_settings?key=eq.${encodeURIComponent(TRACKER_KEY)}&select=*`, {
      method: 'GET',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      return { status: res.status, body: { ok: false, error: `Database error: ${errText.slice(0, 200)}` } };
    }

    const rows = await res.json();
    if (!rows || rows.length === 0) {
      return { status: 200, body: { ok: true, data: defaultTrackerState(), exists: false } };
    }

    const row = rows[0];
    let parsed = {};
    try {
      parsed = typeof row.value === 'string' ? JSON.parse(row.value) : (row.value || {});
    } catch {
      parsed = defaultTrackerState();
    }

    // Ensure baseline fields exist
    parsed.days = parsed.days || {};
    parsed.clients = parsed.clients || {};
    parsed.weeks = Array.isArray(parsed.weeks) && parsed.weeks.length ? parsed.weeks : [...DEFAULT_WEEKS];
    parsed.updated_at = row.updated_at || parsed.updated_at || new Date().toISOString();

    return { status: 200, body: { ok: true, data: parsed, exists: true } };
  } catch (err) {
    console.error('getTracker error:', err.message);
    return { status: 500, body: { ok: false, error: err.message } };
  }
}

/**
 * Update tracker state in Supabase database.
 * Accepts either full state or partial updates (e.g. updating one day's tasks, client count, or targets).
 */
export async function updateTracker(patch = {}, { env = process.env } = {}) {
  const { url, key } = getCredentials(env);
  if (!url || !key) {
    return { status: 500, body: { ok: false, error: 'Database credentials not configured' } };
  }

  try {
    // 1. Fetch current database record to merge cleanly
    const currentRes = await getTracker({ env });
    const current = (currentRes.body && currentRes.body.ok && currentRes.body.data) ? currentRes.body.data : defaultTrackerState();

    const merged = {
      days: { ...(current.days || {}) },
      clients: { ...(current.clients || {}) },
      weeks: Array.isArray(patch.weeks) && patch.weeks.length ? patch.weeks : (current.weeks || [...DEFAULT_WEEKS]),
    };

    // Handle day reset if requested
    if (patch.resetDay && typeof patch.resetDay === 'string') {
      delete merged.days[patch.resetDay];
    }

    // Merge days updates
    if (patch.days && typeof patch.days === 'object') {
      for (const [dayKey, dayTasks] of Object.entries(patch.days)) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dayKey)) continue;
        if (dayTasks === null || dayTasks === false) {
          delete merged.days[dayKey];
        } else if (typeof dayTasks === 'object') {
          merged.days[dayKey] = {
            ...(merged.days[dayKey] || {}),
            ...dayTasks,
          };
        }
      }
    }

    // Merge clients count updates
    if (patch.clients && typeof patch.clients === 'object') {
      for (const [dayKey, count] of Object.entries(patch.clients)) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dayKey)) continue;
        merged.clients[dayKey] = Math.max(0, Math.min(10000, Number(count) || 0));
      }
    }

    const now = new Date().toISOString();
    merged.updated_at = now;

    // 2. Persist to Supabase app_settings table
    const payload = {
      key: TRACKER_KEY,
      value: JSON.stringify(merged),
      updated_at: now,
    };

    const res = await fetch(`${url}/rest/v1/app_settings?on_conflict=key`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      return { status: res.status, body: { ok: false, error: `Failed to save to database: ${errText.slice(0, 200)}` } };
    }

    return { status: 200, body: { ok: true, data: merged } };
  } catch (err) {
    console.error('updateTracker error:', err.message);
    return { status: 500, body: { ok: false, error: err.message } };
  }
}
