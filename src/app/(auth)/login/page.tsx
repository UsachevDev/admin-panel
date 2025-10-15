"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/../public/logo-btx.svg";
import { Input, Button } from "@/components/ui";

export default function LoginPage() {
    const router = useRouter();
    const next = useSearchParams().get("next") || "/";
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErr(null); setLoading(true);
        const fd = new FormData(e.currentTarget);
        const username = String(fd.get("username") || "");
        const password = String(fd.get("password") || "");

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const json = await res.json().catch(() => null);
        setLoading(false);
        if (!res.ok) { setErr(json?.error || "Неверный логин или пароль"); return; }
        router.replace(next);
    }

    return (
        <div className="min-h-dvh bg-primary-100/60 sm:bg-primary-50">
            {/* MOBILE 320 */}
            <div className="sm:hidden mx-auto w-full min-w-[320px]">
                <div className="sm:hidden w-full min-w-[320px] min-h-dvh flex flex-col gap-5 bg-primary-50">
                    {/* белая шапка с лого, скругление только снизу */}
                    <div className="bg-white rounded-b-md shadow-card py-5 flex justify-center">
                        <Image src={Logo} alt="BTX" width={100} height={24} priority />
                    </div>

                    {/* контент, прижат вверх */}
                    <div className="bg-white rounded-t-md rounded-b-0 flex-1 py-6 px-5 space-y-5">
                        <div className="text-center">
                            <h1 className="text-xl leading-7 font-semibold text-content1-foreground">Панель администратора</h1>
                            <p className="mt-2 text-sm leading-5 font-normal text-content3-foreground">Войдите в систему для продолжения</p>
                        </div>

                        <form onSubmit={onSubmit} className="grid gap-5" noValidate>
                            <div className="grid gap-3">
                                <label htmlFor="username" className="text-tiny text-default-600">Имя пользователя</label>
                                <Input id="username" name="username"
                                    classNames={{
                                        inputWrapper: "h-8 min-h-[32px] border-2 border-default-200 rounded-md px-3",
                                        input: "text-small text-default-500",
                                    }} size="sm" isRequired />
                            </div>

                            <div className="grid gap-3">
                                <label htmlFor="password" className="text-tiny text-content4-foreground">Пароль</label>
                                <Input id="password" name="password" type="password"
                                    classNames={{
                                        inputWrapper: "h-8 min-h-[32px] border-2 border-default-200 rounded-md px-3",
                                        input: "text-small text-default-500",
                                    }} size="sm" isRequired />
                            </div>

                            {err && (
                                <div role="alert" className="rounded-md border-2 border-danger/20 bg-danger-50 text-danger px-3 py-2 text-body12">
                                    {err}
                                </div>
                            )}

                            <Button type="submit" color="primary" className="h-10 w-full rounded-md px-4 bg-primary text-primary-foreground" isLoading={loading}>
                                <span className="text-small text-primary-foreground">Войти</span>
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* DESKTOP ≥640px: карточка целиком, лого внутри cap-блока, полный радиус */}
            <div className="hidden sm:flex min-h-dvh items-center justify-center bg-primary-50">
                <div className="w-full max-w-[565px]">
                    <div className="p-14 rounded-xl bg-white shadow-card overflow-hidden">
                        <div className="flex items-center justify-center bg-white">
                            <Image src={Logo} alt="BTX" width={100} height={24} priority />
                        </div>

                        <div className="pt-10 space-y-10">
                            <div className="text-center">
                                <h1 className="text-4xl leading-10 font-semibold text-content1-foreground">Панель администратора</h1>
                                <p className="mt-5 text-lg leading-7 font-normal text-content3-foreground">Войдите в систему для продолжения</p>
                            </div>

                            <form onSubmit={onSubmit} className="grid gap-7" noValidate>
                                <div className="grid gap-3">
                                    <label htmlFor="d-username" className="text-tiny text-default-600">Имя пользователя</label>
                                    <Input id="d-username" name="username" placeholder="admin@example.com" radius="md"
                                        classNames={{
                                            inputWrapper: "h-8 min-h-[32px] border-2 border-default-200 rounded-md px-3",
                                            input: "text-medium text-default-500",
                                        }} isRequired />
                                </div>

                                <div className="grid gap-3">
                                    <label htmlFor="d-password" className="text-tiny text-default-600">Пароль</label>
                                    <Input id="d-password" name="password" type="password" placeholder="Введите пароль" radius="md"
                                        classNames={{
                                            inputWrapper: "h-8 min-h-[32px] border-2 border-default-200 rounded-md px-3",
                                            input: "text-medium text-default-500",
                                        }} isRequired />
                                </div>

                                {err && (
                                    <div role="alert" className="rounded-md border-2 border-danger/20 bg-danger-50 text-danger px-3 py-2">
                                        {err}
                                    </div>
                                )}

                                <Button type="submit" color="primary" className="mt-3 h-10 w-full rounded-md px-4 bg-primary text-primary-foreground" isLoading={loading}>
                                    <span className="text-medium text-primary-foreground">Войти</span>
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
