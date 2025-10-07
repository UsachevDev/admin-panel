"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Post = { id: number; title: string; userId: number; body: string; };

export default function HomePage() {
  const [items, setItems] = useState<Post[]>([]);
  useEffect(() => {
    api<{ posts: Post[] }>("posts?limit=10&skip=0")
      .then(d => setItems(d.posts || []))
      .catch(console.error);
  }, []);
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Посты</h1>
      <ul className="space-y-2">
        {items.map(p => (
          <li key={p.id} className="border rounded p-3">
            <div className="font-medium">{p.title}</div>
            <div className="text-sm opacity-70">Автор: {p.userId}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}