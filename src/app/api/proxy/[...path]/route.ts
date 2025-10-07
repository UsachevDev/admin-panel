import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/auth";

export async function GET(req: NextRequest, ctx: any) { return proxy(req, ctx); }
export async function POST(req: NextRequest, ctx: any) { return proxy(req, ctx); }
export async function PUT(req: NextRequest, ctx: any) { return proxy(req, ctx); }
export async function PATCH(req: NextRequest, ctx: any) { return proxy(req, ctx); }
export async function DELETE(req: NextRequest, ctx: any) { return proxy(req, ctx); }

async function proxy(req: NextRequest, { params }: { params: { path: string[] } }) {
    const url = new URL(req.url);
    const target = `${process.env.NEXT_PUBLIC_API_BASE}/${params.path.join("/")}${url.search}`;
    const token = await getTokenFromCookies();

    const res = await fetch(target, {
        method: req.method,
        headers: {
            "Content-Type": req.headers.get("content-type") ?? "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: ["GET", "HEAD"].includes(req.method) ? undefined : await req.arrayBuffer(),
        cache: "no-store",
    });

    return new NextResponse(res.body, {
        status: res.status,
        headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
    });
}
