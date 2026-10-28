'use client';

import { useEffect } from 'react';

export default function DemoPage() {
  useEffect(() => {
    const handler = (e: any) => {
      const d = e.detail;
      if (d?.type === 'contact') {
        const nameEl = document.getElementById('d-name');
        const phoneEl = document.getElementById('d-phone');
        if (nameEl) nameEl.textContent = d.args?.name || '—';
        if (phoneEl) phoneEl.textContent = d.args?.phone || '—';
      }
    };
    window.addEventListener('sixty:voice', handler);

    const script = document.createElement('script');
    script.src = '/voice.js';
    script.type = 'module';
    document.body.appendChild(script);

    return () => {
      window.removeEventListener('sixty:voice', handler);
      script.remove();
    };
  }, []);

  return (
    <div className="demo-page">
      <main className="demo">
        <p className="demo-kicker">Demo · Voorbeeld Energie</p>
        <h1>Freya belt je terug</h1>
        <p className="demo-sub">
          Klik op de bubble. Freya belt en vraag je naam en telefoonnummer, zodat een adviseur je later kan bereiken. Dit is een fictief bedrijf.
        </p>

        <dl className="demo-card" aria-live="polite">
          <div>
            <dt>Naam</dt>
            <dd id="d-name">—</dd>
          </div>
          <div>
            <dt>Telefoon</dt>
            <dd id="d-phone">—</dd>
          </div>
        </dl>
        <p className="demo-note">Gebruikt je microfoon. Het gesprek kan worden opgenomen om de kwaliteit te verbeteren.</p>
      </main>

      <div className="vdemo" id="vdemo">
        <button type="button" className="orb" id="orb" aria-pressed="false" aria-label="Praat met Freya, live">
          <span className="orb-ring" aria-hidden="true"></span>
          <span className="orb-ring r2" aria-hidden="true"></span>
          <span className="orb-core" aria-hidden="true">
            <svg className="orb-mic" viewBox="0 0 24 24">
              <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z" fill="currentColor" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="orb-bars">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </span>
          </span>
        </button>
        <span className="orb-label" id="orb-label" aria-live="polite">
          Praat met Freya <em>live</em>
        </span>
      </div>
    </div>
  );
}
