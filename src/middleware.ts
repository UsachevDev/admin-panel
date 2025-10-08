// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC = ["/login"];

export const config = {
    // все app-роуты, кроме статики и /api
    matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)"],
};

export function middleware(req: NextRequest) {
    const { pathname, search } = req.nextUrl;
    const token = req.cookies.get("token")?.value;
    const isPublic = PUBLIC.some(p => pathname.startsWith(p));

    if (!token && !isPublic) {
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        url.search = search || "";
        url.searchParams.set("next", pathname);
        return NextResponse.redirect(url);
    }

    if (token && pathname.startsWith("/login")) {
        const url = req.nextUrl.clone();
        url.pathname = "/posts";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}
