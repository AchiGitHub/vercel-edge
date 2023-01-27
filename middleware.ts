import { NextRequest, NextResponse } from 'next/server';
import { getAll } from '@vercel/edge-config';

export const config = { matcher: ['/'] };

export async function middleware(req: NextRequest) {

    if (!process.env.EDGE_CONFIG) {
        console.error("No config found")
        // return NextResponse.rewrite(req.nextUrl)
    }

    try {
        // Check whether the maintenance page should be shown
        const jsonConfig = await getAll()

        // If is in maintenance mode, point the url pathname to the maintenance page
        if (jsonConfig) {
            console.log(jsonConfig)
            req.cookies.set("config", jsonConfig)
            // Rewrite to the url
            return NextResponse
        }
    } catch (error) {
        // show the default page if EDGE_CONFIG env var is missing,
        // but log the error to the console
        console.error(error)
    }
}
