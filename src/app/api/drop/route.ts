import { NextResponse } from 'next/server';
import { getDropStatus } from '@/lib/drop';

export const revalidate = 60;

export async function GET() {
  const status = getDropStatus();
  return NextResponse.json(status, {
    headers: {
      'Cache-Control': 's-maxage=60, stale-while-revalidate=120',
    },
  });
}
