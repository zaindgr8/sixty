import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sixty Leads CRM',
  robots: { index: false, follow: false },
};

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return children;
}
