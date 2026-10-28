import { NextResponse } from 'next/server';
import { getTracker, updateTracker } from '@/lib/tracker.mjs';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-sixty-key',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET() {
  try {
    const { status, body } = await getTracker();
    return NextResponse.json(body, {
      status,
      headers: corsHeaders,
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Server error' }, {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { status, body: out } = await updateTracker(body || {});
    return NextResponse.json(out, {
      status,
      headers: corsHeaders,
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Server error' }, {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export const maxDuration = 30;
