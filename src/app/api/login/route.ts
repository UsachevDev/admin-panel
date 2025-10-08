import { NextResponse } from "next/server";
import { setToken, clearToken } from "@/lib/auth";

const RAW = process.env.NEXT_PUBLIC_API_BASE || "https://dummyjson.com";
const BASE = RAW.replace(/\/$/, "");
const DEV_FAKE_AUTH = process.env.DEV_FAKE_AUTH === "1";

async function readUpstreamMessage(res: Response) {
    const ct = res.headers.get("content-type") || "";
    try {
        if (ct.includes("application/json")) {
            const j = await res.json();
            return j?.message || j?.error || JSON.stringify(j);
        }
    } catch { }
    try { return await res.text(); } catch { return ""; }
}

export async function POST(req: Request) {
    try {
        const body = await req.json(); // { username, password }
        const upstream = await fetch(`${BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(body),
            cache: "no-store",
        });

        if (!upstream.ok) {
            const msg = await readUpstreamMessage(upstream);
            // Dev-фолбэк: не блокируем разработку, если апстрим нестабилен
            if (DEV_FAKE_AUTH && body?.username === "kminchelle" && body?.password === "0lelplR") {
                await setToken("dev.fake.jwt");
                return NextResponse.json({ ok: true, user: { id: 1, username: "kminchelle", token: "dev.fake.jwt" } });
            }
            return NextResponse.json(
                { error: `Upstream ${upstream.status}: ${msg || upstream.statusText}` },
                { status: upstream.status }
            );
        }

        const data = await upstream.json(); // { token, ... }
        if (data.token) await setToken(data.token);
        return NextResponse.json({ ok: true, user: data });
    } catch (e: any) {
        return NextResponse.json({ error: String(e?.message || e) }, { status: 502 });
    }
}

export async function DELETE() {
    await clearToken();
    return NextResponse.json({ ok: true });
}
