import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

export default async () => {
  const exampleValue1 = await get('example_key_1');
  return NextResponse.json({
    example: `This is the value of "example_key_1" in my Edge Config: ${exampleValue1}!`,
  });
};

export const config = {
  runtime: 'experimental-edge',
};
