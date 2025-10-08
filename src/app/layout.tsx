import type { Metadata } from "next";
import "@/styles/globals.scss";

export const metadata: Metadata = {
    title: "Admin",
    description: "Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <body className="min-h-dvh bg-gray-50 text-gray-900 antialiased">
                {children}
            </body>
        </html>
    );
}
