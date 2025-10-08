import { cookies } from "next/headers";

const TOKEN_COOKIE = "token";

export async function setToken(token: string) {
    const c = await cookies();
    c.set(TOKEN_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 8,
    });
}

export async function clearToken() {
    const c = await cookies();
    c.delete(TOKEN_COOKIE);
}

export async function getTokenFromCookies() {
    const c = await cookies();
    return c.get(TOKEN_COOKIE)?.value ?? null;
}