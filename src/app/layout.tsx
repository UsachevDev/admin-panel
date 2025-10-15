import type { Metadata } from "next";
import "@/styles/globals.scss";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin", "cyrillic"], weight: ["400", "600"] });

export const metadata: Metadata = {
    title: "Admin",
    description: "Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <body className={`${inter.className} min-h-dvh bg-gray-50 text-foreground antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
