"use server";
import { cookies } from "next/headers";

const TOKEN_COOKIE = "token";

export async function setToken(token: string) {
    cookies().set(TOKEN_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 8,
    });
}

export async function clearToken() {
    cookies().delete(TOKEN_COOKIE);
}

export async function getTokenFromCookies(): Promise<string | undefined> {
    return cookies().get(TOKEN_COOKIE)?.value;
}
