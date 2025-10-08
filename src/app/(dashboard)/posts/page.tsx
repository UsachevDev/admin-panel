import { headers } from "next/headers";
import { Pagination } from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";

type Post = { id: number; title: string };
type ApiList<T> = { total: number; items: T[]; error?: string | null };

async function loadPosts(base: string, page: number, limit: number, q: string): Promise<ApiList<Post>> {
    const params = new URLSearchParams({ limit: String(limit), skip: String((page - 1) * limit) });
    if (q) params.set("q", q);
    const url = `${base}/api/proxy/posts?${params.toString()}`;

    try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) {
            const j = await res.json().catch(() => null);
            return { items: [], total: 0, error: j?.error || `HTTP ${res.status}` };
        }
        const data = await res.json();
        const items = (data.posts ?? data.items ?? []) as Post[];
        const total = data.total ?? items.length;
        return { items, total, error: null };
    } catch (e: any) {
        // dev-фолбэк
        if (process.env.DEV_FAKE_DATA === "1") {
            const items = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, title: `Sample post #${i + 1}` }));
            return { items, total: 42, error: null };
        }
        return { items: [], total: 0, error: e?.message || "fetch_failed" };
    }
}

export default async function Page({ searchParams }: {
    searchParams: Promise<{ page?: string; q?: string }>
}) {
    const sp = await searchParams;
    const page = Number(sp.page ?? 1);
    const q = sp.q ?? "";
    const perPage = 10;

    const h = await headers();
    const proto = h.get("x-forwarded-proto") ?? "http";
    const host = h.get("x-forwarded-host") ?? h.get("host")!;
    const base = `${proto}://${host}`;

    const { items, total, error } = await loadPosts(base, page, perPage, q);

    return (
        <div className="grid gap-4">
            <div className="flex items-center justify-between">
                <SearchBar />
                <Pagination page={page} total={total} perPage={perPage} q={q} />
            </div>

            {error && (
                <div role="alert" className="rounded-xl border border-red-200 bg-red-50 text-red-700 px-3 py-2">
                    API error: {error}
                </div>
            )}

            <div className="card overflow-x-auto">
                {items.length === 0 ? (
                    <div className="py-10 text-center text-gray-500">Нет данных</div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-500">
                                <th className="py-2 pr-3">ID</th>
                                <th className="py-2 pr-3">Заголовок</th>
                                <th className="py-2 pr-3">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((p, i) => (
                                <tr key={p.id} className={i % 2 ? "bg-gray-50" : ""}>
                                    <td className="py-2 pr-3">{p.id}</td>
                                    <td className="py-2 pr-3">{p.title}</td>
                                    <td className="py-2 pr-3">
                                        <a className="text-brand-600 hover:underline" href={`/posts/${p.id}/comments`}>Комментарии</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
