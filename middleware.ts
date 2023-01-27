import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

export const config = { matcher: '/' };

export async function middleware() {
  const greeting = await get('isInMaintenanceMode');
  return NextResponse.json(greeting);
}
