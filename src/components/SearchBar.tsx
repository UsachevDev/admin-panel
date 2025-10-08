"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Input, Button } from "@/components/ui";
import { useState, useEffect } from "react";

export default function SearchBar() {
    const sp = useSearchParams();
    const [q, setQ] = useState(sp.get("q") ?? "");
    const r = useRouter();
    useEffect(() => setQ(sp.get("q") ?? ""), [sp]);
    return (
        <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); r.push(`?page=1${q ? `&q=${encodeURIComponent(q)}` : ""}`); }}>
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Поиск..." />
            <Button type="submit" color="primary">Найти</Button>
        </form>
    );
}
