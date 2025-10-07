"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const next = useSearchParams().get("next") || "/";
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErr(null); setLoading(true);
        const form = e.target as HTMLFormElement;
        const username = (form.elements.namedItem("username") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const payload = await res.json().catch(() => null);
        setLoading(false);
        if (!res.ok) {
            setErr(payload?.error || "Неверный логин или пароль");
            return;
        }
        router.replace(next);
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
                <h1 className="text-xl font-semibold">Вход</h1>
                <input name="username" placeholder="Логин" className="w-full border rounded px-3 py-2" required />
                <input name="password" type="password" placeholder="Пароль" className="w-full border rounded px-3 py-2" required />
                {err && <p className="text-red-500 text-sm">{err}</p>}
                <button disabled={loading} className="w-full border rounded px-3 py-2">
                    {loading ? "Входим..." : "Войти"}
                </button>
            </form>
        </div>
    );
}
