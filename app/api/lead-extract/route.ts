import { NextResponse } from 'next/server';
import { handleLeadExtract } from '@/lib/lead-extract.mjs';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { status, body: out } = await handleLeadExtract(body || {});
    return NextResponse.json(out, { status });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}

export const maxDuration = 30;
