import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
const config = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            borderRadius: { md: "12px", xl: "16px", "2xl": "20px" },
            boxShadow: { card: "0 8px 24px rgba(0,0,0,.06)" },
            fontSize: {
                h1: ["36px", { lineHeight: "40px", fontWeight: "600" }],
                body18: ["18px", { lineHeight: "28px" }],
                body14: ["14px", { lineHeight: "20px" }],
                body12: ["12px", { lineHeight: "16px" }],
                btn16: ["16px", { lineHeight: "24px", fontWeight: "600" }],
            },
            colors: {
                // вспомогательные алиасы для utility-классов
                text: {
                    primary: "#11181C",
                    fg500: "#71717A",
                    fg600: "#52525B",
                },
            },
        },
    },
    plugins: [
        heroui({
            themes: {
                light: {
                    colors: {
                        // layout / content
                        foreground: "#11181C",
                        "content1-foreground": "#11181C",
                        "content2-foreground": "#27272A",
                        "content3-foreground": "#3F3F46",
                        "content4-foreground": "#52525B",

                        // gray/default palette
                        default: {
                            DEFAULT: "#D4D4D8",      // base/default
                            200: "#E4E4E7",          // base/default-200
                            500: "#71717A",          // base/default-500
                            600: "#52525B",          // base/default-600
                            700: "#3F3F46",          // base/default-700
                            foreground: "#000000",   // base/default-foreground
                        },

                        // primary
                        primary: {
                            DEFAULT: "#006FEE",      // base/primary
                            50: "#E6F1FE",          // base/primary-50
                            100: "#CCE3FD",          // base/primary-100
                            400: "#338EF7",          // base/primary-400
                            foreground: "#FFFFFF",   // base/primary-foreground
                        },

                        warning: { DEFAULT: "#F5A524" }, // base/warning
                        danger: { DEFAULT: "#F31260" }, // base/danger
                    },
                    layout: {
                        radius: { small: "8px", medium: "12px", large: "16px" },
                    },
                },
            },
        }),
    ],
};
export default config;
