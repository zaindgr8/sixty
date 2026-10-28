import './globals.css';

// Public marketing pages (/, /privacy, /data-deletion, /demo) share the landing stylesheet.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
