import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: "#f5f7ff", 100: "#e8edff", 200: "#c6d3ff", 300: "#9fb5ff",
                    400: "#7897ff", 500: "#5179ff", 600: "#3f5fdb", 700: "#324ab0",
                    800: "#273885", 900: "#1c285d"
                },
            },
            borderRadius: { xl: "14px", "2xl": "20px" },
            boxShadow: { card: "0 4px 14px rgba(0,0,0,.08)" },
        },
    },
    plugins: [heroui()],
};
export default config;
