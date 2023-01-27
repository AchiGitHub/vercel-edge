import { NextRequest, NextResponse } from 'next/server';
import { getAll } from '@vercel/edge-config';

const getConfig = async (req: NextRequest) => {
  const configItems = await getAll();
  req.cookies.set("config", configItems);
  return NextResponse.json({
    values: `These are all the values in my Edge Config: ${configItems}`,
  });
};

export default getConfig;

export const config = {
  runtime: 'experimental-edge',
};
