import { headers } from "next/headers";
import { Pagination } from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";

type Post = { id: number; title: string };
type ApiList<T> = { total: number; items: T[] };

async function loadPosts(base: string, page: number, limit: number, q: string) {
    const params = new URLSearchParams({ limit: String(limit), skip: String((page - 1) * limit) });
    if (q) params.set("q", q);
    const url = `${base}/api/proxy/posts?${params.toString()}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("load");
    const data = await res.json();
    const items = data.posts ?? data.items ?? [];
    const total = data.total ?? items.length;
    return { items, total } as ApiList<Post>;
}

export default async function Page(props: {
    searchParams: Promise<{ page?: string; q?: string }>;
}) {
    const sp = await props.searchParams;
    const page = Number(sp.page ?? 1);
    const q = sp.q ?? "";
    const perPage = 10;

    const h = await headers();
    const proto = h.get("x-forwarded-proto") ?? "http";
    const host = h.get("x-forwarded-host") ?? h.get("host")!;
    const base = `${proto}://${host}`;

    const { items, total } = await loadPosts(base, page, perPage, q);

    return (
        <div className="grid gap-4">
            <div className="flex items-center justify-between">
                <SearchBar />
                <Pagination page={page} total={total} perPage={perPage} q={q} />
            </div>

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
