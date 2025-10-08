import { headers } from "next/headers";
import { listUsers } from "@/features/users/api";
import UsersClient from "./UsersClient";
import { Pagination } from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";

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

    const { items, total } = await listUsers(page, perPage, q, base);

    return (
        <div className="grid gap-4">
            <div className="flex items-center justify-between">
                <SearchBar />
                <Pagination page={page} total={total} perPage={perPage} q={q} />
            </div>
            <UsersClient items={items} page={page} perPage={perPage} total={total} q={q} />
        </div>
    );
}
