'use client';

import { useEffect } from 'react';
import './crm.css';

export default function CrmPage() {
  useEffect(() => {
    (window as any).SUPABASE_URL = 'https://fsopwsygsnuufwfylaiv.supabase.co';
    (window as any).SUPABASE_KEY = 'sb_publishable_V_ui2odaR5LZdDgpwElk3g_vgqNN4uU';
    (window as any).closeMail = function () {
      document.getElementById('mailBg')?.classList.add('hidden');
      document.getElementById('mailPanel')?.classList.add('hidden');
    };

    // app.js binds listeners to this DOM. Run it once per mount: strict mode runs effects twice on the same DOM,
    // while a fresh visit to /crm renders a new DOM that needs binding again.
    const root = document.querySelector<HTMLElement>('.crm-root');
    if (!root || root.dataset.ready) return;
    root.dataset.ready = '1';

    document.getElementById('crm-app-script')?.remove();
    const script = document.createElement('script');
    script.id = 'crm-app-script';
    script.src = '/crm/app.js';
    document.body.appendChild(script);
  }, []);

  return (
    <div className="crm-root">
      {/* ============ LOGIN ============ */}
      <section id="loginView" className="login hidden">
        <form className="login-card" id="loginForm" autoComplete="on">
          <div className="logo">
            <span className="mark" aria-hidden="true">
              <svg viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="2" opacity=".25" />
                <path d="M16 3a13 13 0 1 1-11.3 6.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                <circle cx="16" cy="16" r="2.6" fill="currentColor" />
              </svg>
            </span>
            Sixty <span className="by">by DevMate</span>
          </div>
          <div className="eyebrow">Outreach · UK + USA</div>
          <h1>Sign in</h1>
          <p>Leads from Supabase</p>
          <label htmlFor="u">Username</label>
          <input className="input" id="u" name="username" autoComplete="username" required />
          <label htmlFor="p">Password</label>
          <input className="input" id="p" name="password" type="password" autoComplete="current-password" required />
          <button className="btn primary block" id="loginBtn" type="submit">
            Sign in
          </button>
          <div className="err" id="loginErr"></div>
        </form>
      </section>

      {/* ============ APP ============ */}
      <div id="appView" className="hidden">
        <header className="top">
          <div className="top-inner">
            <div className="logo">
              <span className="mark" aria-hidden="true">
                <svg viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="2" opacity=".25" />
                  <path d="M16 3a13 13 0 1 1-11.3 6.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  <circle cx="16" cy="16" r="2.6" fill="currentColor" />
                </svg>
              </span>
              Sixty <span className="by">Leads</span>
            </div>
            <nav className="tabs" id="tabs">
              <button data-tab="leads" className="on">
                Leads
              </button>
              <button data-tab="linkedin">LinkedIn</button>
              <button data-tab="funnel">Funnel</button>
              <button data-tab="log">Email log</button>
              <button data-tab="stats">Stats</button>
            </nav>
            <div className="spacer"></div>
            <button className="btn" id="refreshBtn" title="Refresh">
              Refresh
            </button>
            <button className="btn" id="logoutBtn">
              Log out
            </button>
          </div>
        </header>

        <main>
          {/* Leads */}
          <section id="tab-leads" className="hidden">
            <div className="toolbar">
              <h2>Leads</h2>
              <span className="muted small" id="leadCount"></span>
              <div className="spacer"></div>
              <button className="btn" id="exportBtn">
                Export CSV
              </button>
            </div>
            <div className="filters">
              <input className="input" id="fSearch" placeholder="Search name, email, company, title, industry" />
              <select id="fCountry">
                <option value="">All countries</option>
                <option value="UK">UK</option>
                <option value="USA">USA</option>
              </select>
              <select id="fStatus">
                <option value="">Any pipeline status</option>
              </select>
              <select id="fEmailStatus">
                <option value="">Any email status</option>
              </select>
              <select id="fEngagement">
                <option value="">Any engagement</option>
                <option value="opened">Opened</option>
                <option value="clicked">Clicked</option>
                <option value="not_opened">Emailed, not opened</option>
              </select>
            </div>
            <div className="card" style={{ padding: 0 }}>
              <div className="table-wrap" id="leadsTable"></div>
            </div>
            <div className="pager">
              <span className="muted small" id="pageInfo"></span>
              <button className="btn" id="prevPage">
                Previous
              </button>
              <button className="btn" id="nextPage">
                Next
              </button>
            </div>
          </section>

          {/* Email log */}
          <section id="tab-log" className="hidden">
            <div className="toolbar">
              <h2>Email log</h2>
              <span className="muted small" id="logCount"></span>
              <div className="spacer"></div>
              <input type="date" className="input" id="logDay" style={{ width: 'auto' }} />
            </div>
            <div className="card" style={{ padding: 0 }}>
              <div className="table-wrap" id="logTable"></div>
            </div>
          </section>

          {/* Stats */}
          <section id="tab-stats" className="hidden">
            <div className="toolbar">
              <h2>Stats</h2>
              <div className="spacer"></div>
              <select id="statsRange" defaultValue="14" style={{ width: 'auto', borderRadius: '999px' }}>
                <option value="7">Last 7 days</option>
                <option value="14">
                  Last 14 days
                </option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </div>
            <div className="card" style={{ padding: 0 }}>
              <div className="table-wrap" id="statsTable"></div>
            </div>
            <p className="muted small">
              From Brevo. Opens are approximate (Apple Mail and some corporate filters open emails automatically).
              Replies are not tracked yet.
            </p>
          </section>

          {/* LinkedIn */}
          <section id="tab-linkedin" className="hidden">
            <div className="toolbar">
              <h2>LinkedIn</h2>
              <span className="muted small" id="liCount"></span>
              <div className="spacer"></div>
              <select id="liFilter" style={{ width: 'auto', borderRadius: '999px' }}>
                <option value="all">Invited or commented</option>
                <option value="invited">Invited</option>
                <option value="commented">Commented</option>
              </select>
            </div>
            <div className="card" style={{ padding: 0 }}>
              <div className="table-wrap" id="liTable"></div>
            </div>
            <div className="pager">
              <span className="muted small" id="liPageInfo"></span>
              <button className="btn" id="liPrevPage">
                Previous
              </button>
              <button className="btn" id="liNextPage">
                Next
              </button>
            </div>
            <p className="muted small">
              From lead tags. Invite and comment detail lives on each lead: open a row to see it in the drawer.
            </p>
          </section>

          {/* Funnel */}
          <section id="tab-funnel" className="hidden">
            <div className="toolbar">
              <h2>Funnel</h2>
              <span className="muted small" id="funnelCount"></span>
            </div>
            <div className="grid kpis" id="funnelKpis"></div>
            <div className="card" style={{ padding: 0, marginTop: '12px' }}>
              <div className="table-wrap" id="funnelTable"></div>
            </div>
            <p className="muted small">
              From pipeline status in Supabase. Meetings booked (demo_booked) is the headline number. Split by country
              only: the lead feed does not carry a segment field.
            </p>
          </section>
        </main>
      </div>

      {/* Lead drawer */}
      <div id="drawerBg" className="drawer-bg hidden"></div>
      <aside id="drawer" className="drawer hidden" aria-modal="true" role="dialog"></aside>

      {/* Email detail */}
      <div
        id="mailBg"
        className="drawer-bg hidden"
        style={{ zIndex: 40 }}
        onClick={() => (window as any).closeMail?.()}
      ></div>
      <aside
        id="mailPanel"
        className="drawer hidden"
        style={{
          zIndex: 41,
          width: 'min(460px, 100%)',
          overflowWrap: 'anywhere',
          boxShadow: '-30px 0 80px -20px rgba(0,0,0,.7)',
        }}
        aria-modal="true"
        role="dialog"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <h3 style={{ margin: 0 }}>Email details</h3>
          <button className="btn small" onClick={() => (window as any).closeMail?.()}>
            Close
          </button>
        </div>
        <div id="mailBody" style={{ marginTop: '18px' }}></div>
      </aside>
      <div id="toast" className="toast hidden"></div>
    </div>
  );
}
