import { NextResponse } from 'next/server';
import { getAll } from '@vercel/edge-config';

export default async () => {
  const config = await getAll();
  return NextResponse.json(config);
};

export const config = {
  runtime: 'experimental-edge',
};
