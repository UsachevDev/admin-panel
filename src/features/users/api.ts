import { User } from "./types";

function rel(path: string) {
    return `/api/proxy${path}`;
}

export async function listUsers(page: number, limit: number, q: string, base?: string) {
    const p = new URLSearchParams({ limit: String(limit), skip: String((page - 1) * limit) });
    if (q) p.set("q", q);

    const path = `/users?${p.toString()}`;
    const url = base ? `${base}${rel(path)}` : rel(path); // SSR => absolute, CSR => relative

    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) return { items: [] as User[], total: 0 };

    const j = await r.json();
    const items: User[] = (j.users ?? j.items ?? []).map((u: any) => ({
        id: u.id,
        fullName: u.fullName ?? u.name ?? "",
        email: u.email ?? "",
        phone: u.phone,
        role: u.role ?? "user",
        active: Boolean(u.active ?? u.isActive ?? true),
        avatarUrl: u.image ?? u.avatarUrl,
    }));
    const total = j.total ?? items.length;
    return { items, total };
}

export async function createUser(data: Partial<User> & { password?: string }) {
    const r = await fetch(rel(`/users`), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!r.ok) throw new Error("create");
    return r.json();
}

export async function updateUser(id: number, data: Partial<User>) {
    const r = await fetch(rel(`/users/${id}`), {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!r.ok) throw new Error("update");
    return r.json();
}

export async function deleteUser(id: number) {
    const r = await fetch(rel(`/users/${id}`), { method: "DELETE" });
    if (!r.ok) throw new Error("delete");
    return r.json();
}