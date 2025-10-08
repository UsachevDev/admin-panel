import type { ReactNode } from "react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh grid grid-cols-[var(--sidebar-width)_1fr]">
      <aside className="border-r bg-white">
        <div className="p-4 text-lg font-semibold">Admin</div>
        <nav className="grid gap-1 p-2">
          {[
            { href: "/posts", label: "Публикации" },
            { href: "/comments", label: "Комментарии" },
            { href: "/users", label: "Пользователи" },
            { href: "/admins", label: "Администраторы" },
            { href: "/profile", label: "Профиль" },
            { href: "/password", label: "Пароль" },
          ].map(i => (
            <Link
              key={i.href}
              href={i.href}
              className="px-3 py-2 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              {i.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="grid grid-rows-[56px_1fr]">
        <header className="h-14 border-b bg-white flex items-center justify-end px-4 gap-2">
          {/* topbar: поиск/аватар/меню */}
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
