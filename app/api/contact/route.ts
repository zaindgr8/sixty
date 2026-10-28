import { NextResponse } from 'next/server';
import { handleContact } from '@/lib/contact.mjs';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '';
    const { status, body: out } = await handleContact(body, { ip });
    return NextResponse.json(out, { status });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}

export const maxDuration = 30;
