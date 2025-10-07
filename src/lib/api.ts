export async function api<T>(input: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`/api/proxy/${input.replace(/^\/+/, "")}`, {
        ...init,
        headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
        cache: "no-store",
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`${res.status}: ${text}`);
    }
    return res.json() as Promise<T>;
}
