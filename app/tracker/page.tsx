'use client';

import { useEffect } from 'react';
import './tracker.css';

export default function TrackerPage() {
  useEffect(() => {
    const existing = document.getElementById('sixty-tracker-script');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = 'sixty-tracker-script';
    script.src = '/tracker.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const s = document.getElementById('sixty-tracker-script');
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="tracker-body">
      <div className="wrap">
        <header>
          <p className="kicker">Sixty · private tracker</p>
          <h1>100 clients by 1 January 2027</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
            <p className="muted" style={{ margin: 0 }}>
              Tick the day&apos;s tasks. Progress is saved directly to your database.
            </p>
            <div
              id="sync-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                font: '500 11px var(--f-mono)',
                padding: '4px 11px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--line)',
                color: 'var(--muted)',
              }}
            >
              <span
                id="sync-dot"
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#3ee0a6',
                  display: 'inline-block',
                  transition: 'all .3s ease',
                }}
              ></span>
              <span id="sync-text">Connecting to database...</span>
            </div>
          </div>
          <div className="card" style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
              <b style={{ fontSize: 18 }} id="overall">
                0 / 100 clients
              </b>
              <span className="muted" id="pace">
                Set your starting count below
              </span>
            </div>
            <div className="bar">
              <i id="bar"></i>
            </div>
            <div className="stats">
              <div className="stat">
                <b id="s-days">0</b>
                <span>days left</span>
              </div>
              <div className="stat">
                <b id="s-need">0</b>
                <span>clients / week needed</span>
              </div>
              <div className="stat">
                <b id="s-streak">0</b>
                <span>day streak</span>
              </div>
            </div>
            <div className="today" style={{ marginTop: 14 }}>
              <label className="muted">
                Paying clients today
                <input
                  id="clients"
                  type="number"
                  min="0"
                  max="500"
                  defaultValue="0"
                  inputMode="numeric"
                  style={{ marginLeft: 6, width: 90 }}
                />
              </label>
              <span className="note">Update when a client pays. The total is yours to set.</span>
            </div>
          </div>
        </header>

        <nav className="tabs" role="tablist" aria-label="Sections">
          <button role="tab" aria-selected="true" data-tab="today">
            Today
          </button>
          <button role="tab" aria-selected="false" data-tab="plan">
            Strategy
          </button>
          <button role="tab" aria-selected="false" data-tab="weeks">
            Weekly targets
          </button>
          <button role="tab" aria-selected="false" data-tab="log">
            Daily log
          </button>
        </nav>

        {/* TODAY */}
        <section id="tab-today" className="card">
          <div className="today">
            <div>
              <h2 id="today-title">Today</h2>
              <span className="note" id="today-note"></span>
            </div>
            <button className="btn" id="reset-day" type="button">
              Reset today
            </button>
          </div>
          <ul className="todo" id="todo" style={{ marginTop: 12 }}></ul>
        </section>

        {/* STRATEGY */}
        <section id="tab-plan" className="card" hidden>
          <h2>The strategy in five lines</h2>
          <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li>
              <b>One offer.</b> WhatsApp AI agent, Founding price, free setup until 31 Dec, live in 7 days.
            </li>
            <li>
              <b>Two home verticals.</b> UAE real estate brokerages and clinics. USA through agency partners.
            </li>
            <li>
              <b>Partners are the multiplier.</b> One agency with 5 to 10 clients beats 10 cold leads.
            </li>
            <li>
              <b>Show, don&apos;t tell.</b> A live demo number and &ldquo;Talk to Freya&rdquo; beat any pitch deck.
            </li>
            <li>
              <b>Measure weekly.</b> Replies, meetings, demos, closes. Cut what doesn&apos;t convert.
            </li>
          </ol>
          <h2 style={{ marginTop: 18 }}>Where the 100 come from</h2>
          <table>
            <thead>
              <tr>
                <th>Source</th>
                <th>Target</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Agency partners (white-label)</td>
                <td>40 clients</td>
                <td>Founder</td>
              </tr>
              <tr>
                <td>LinkedIn outreach (UAE, USA)</td>
                <td>25 clients</td>
                <td>Founder + sales</td>
              </tr>
              <tr>
                <td>Referrals from clients</td>
                <td>15 clients</td>
                <td>Customer success</td>
              </tr>
              <tr>
                <td>Cold email (US and UAE)</td>
                <td>10 clients</td>
                <td>Sales</td>
              </tr>
              <tr>
                <td>Inbound (website, demo, Meta ads)</td>
                <td>10 clients</td>
                <td>Marketing</td>
              </tr>
            </tbody>
          </table>
          <p className="note" style={{ marginTop: 10 }}>
            Adjust these numbers as you learn. The weekly targets below assume this mix.
          </p>
        </section>

        {/* WEEKLY */}
        <section id="tab-weeks" className="card" hidden>
          <h2>Weekly targets (cumulative clients)</h2>
          <table id="weeks-table"></table>
          <p className="note" style={{ marginTop: 10 }}>
            Targets start at 3 and reach 100 by week 11. Edit a number to change the target.
          </p>
        </section>

        {/* LOG */}
        <section id="tab-log" className="card" hidden>
          <h2>Last 14 days</h2>
          <div className="days" id="days"></div>
          <p className="note" style={{ marginTop: 12 }}>
            Green = at least 80% of that day&apos;s tasks done. Tap a day to see it in Today (past days can be reviewed, not changed).
          </p>
        </section>
      </div>
    </div>
  );
}
