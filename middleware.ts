import { get } from '@vercel/edge-config';
import { NextRequest } from 'next/server';

export const config = { matcher: ['/'] };

export async function middleware(req: NextRequest) {
  const edgeConfig = await get('isInMaintenanceMode');
  // NextResponse.json requires at least Next v13.1 or
  // enabling experimental.allowMiddlewareResponseBody in next.config.js
//   return NextResponse.json(edgeConfig);
    req.cookies.set("cookie", edgeConfig)
}