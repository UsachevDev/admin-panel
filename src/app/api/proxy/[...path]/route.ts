// src/app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/auth";

const BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");

export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
    const { path } = await ctx.params;
    return proxy(req, path);
}
export async function POST(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
    const { path } = await ctx.params;
    return proxy(req, path);
}
export async function PUT(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
    const { path } = await ctx.params;
    return proxy(req, path);
}
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
    const { path } = await ctx.params;
    return proxy(req, path);
}
export async function DELETE(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
    const { path } = await ctx.params;
    return proxy(req, path);
}

async function proxy(req: NextRequest, path: string[]) {
    const url = new URL(req.url);
    const target = `${BASE}/${path.join("/")}${url.search}`;
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
