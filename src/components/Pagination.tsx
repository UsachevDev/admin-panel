import Link from "next/link";

export function Pagination({ page, total, perPage, q }: {
    page: number; total: number; perPage: number; q?: string;
}) {
    const pages = Math.max(1, Math.ceil(total / perPage));
    const prev = Math.max(1, page - 1);
    const next = Math.min(pages, page + 1);
    const qs = (p: number) => `?page=${p}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
    return (
        <div className="flex items-center gap-2">
            <Link className="btn border" href={qs(prev)} aria-disabled={page === 1}>Назад</Link>
            <span className="text-sm">стр. {page} / {pages}</span>
            <Link className="btn border" href={qs(next)} aria-disabled={page === pages}>Вперёд</Link>
        </div>
    );
}
