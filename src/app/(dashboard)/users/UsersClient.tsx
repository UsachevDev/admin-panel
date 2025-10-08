"use client";
import { useState, useTransition } from "react";
import { Button, Input, HSelect as Select, HSelectItem as SelectItem, HCheckbox as Checkbox } from "@/components/ui";
import { User } from "@/features/users/types";
import { createUser, updateUser, deleteUser } from "@/features/users/api";
import { UserSchema, type UserInput } from "@/features/users/schema";
import { Modal } from "@/components/ui";
import { useRouter } from "next/navigation";

type Props = { items: User[]; page: number; perPage: number; total: number; q?: string };

export default function UsersClient({ items }: Props) {
    const [open, setOpen] = useState<false | { mode: "create" | "edit" | "delete", user?: User }>(false);
    const [err, setErr] = useState<string>(""); const [isP, start] = useTransition(); const r = useRouter();

    async function onSubmit(form: FormData, user?: User) {
        setErr("");
        const raw: UserInput = {
            fullName: String(form.get("fullName") || ""),
            email: String(form.get("email") || ""),
            phone: String(form.get("phone") || ""),
            role: (form.get("role") || "user") as any,
            active: form.get("active") === "on",
            password: String(form.get("password") || "") || undefined,
        };
        const parsed = UserSchema.safeParse(raw);
        if (!parsed.success) { setErr(parsed.error.issues[0].message); return; }
        start(async () => {
            try {
                if (user) await updateUser(user.id, { ...parsed.data, password: undefined });
                else await createUser(parsed.data);
                setOpen(false); r.refresh();
            } catch { setErr("Save failed"); }
        });
    }

    return (
        <div className="card overflow-x-auto">
            <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold">Users</h2>
                <Button color="primary" onPress={() => setOpen({ mode: "create" })}>Add user</Button>
            </div>
            {items.length === 0 ? <div className="py-10 text-center text-gray-500">No data</div> :
                <table className="w-full text-sm">
                    <thead><tr className="text-left text-gray-500">
                        <th className="py-2 pr-3">ID</th><th className="py-2 pr-3">Name</th><th className="py-2 pr-3">Email</th>
                        <th className="py-2 pr-3">Role</th><th className="py-2 pr-3">Active</th><th className="py-2 pr-3">Actions</th>
                    </tr></thead>
                    <tbody>
                        {items.map((u, i) => (
                            <tr key={u.id} className={i % 2 ? "bg-gray-50" : ""}>
                                <td className="py-2 pr-3">{u.id}</td>
                                <td className="py-2 pr-3">{u.fullName}</td>
                                <td className="py-2 pr-3">{u.email}</td>
                                <td className="py-2 pr-3">{u.role}</td>
                                <td className="py-2 pr-3">{u.active ? "yes" : "no"}</td>
                                <td className="py-2 pr-3 space-x-2">
                                    <button className="text-brand-600 hover:underline" onClick={() => setOpen({ mode: "edit", user: u })}>Edit</button>
                                    <button className="text-red-600 hover:underline" onClick={() => setOpen({ mode: "delete", user: u })}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}

            {/* Create/Edit */}
            {open && (open.mode === "create" || open.mode === "edit") && (
                <Modal open onOpenChange={() => setOpen(false)} title={open.mode === "create" ? "Add user" : "Edit user"}>
                    <form action={(fd) => onSubmit(fd, open.user)} className="grid gap-3">
                        <label className="label">Full name</label>
                        <Input name="fullName" defaultValue={open.user?.fullName} isRequired />
                        <label className="label">Email</label>
                        <Input name="email" type="email" defaultValue={open.user?.email} isRequired />
                        <label className="label">Phone</label>
                        <Input name="phone" defaultValue={open.user?.phone} />
                        <label className="label">Role</label>
                        <Select name="role" defaultSelectedKeys={[open.user?.role ?? "user"]}>
                            <SelectItem key="user">user</SelectItem>
                            <SelectItem key="admin">admin</SelectItem>
                        </Select>
                        <div className="flex items-center gap-2">
                            <Checkbox name="active" defaultSelected={open.user?.active ?? true}>Active</Checkbox>
                        </div>
                        {!open.user && (<>
                            <label className="label">Password</label>
                            <Input name="password" type="password" />
                        </>)}
                        {err && <p className="text-sm text-red-600">{err}</p>}
                        <div className="flex justify-end gap-2 pt-2">
                            <Button variant="light" onPress={() => setOpen(false)}>Cancel</Button>
                            <Button color="primary" type="submit" isLoading={isP}>Save</Button>
                        </div>
                    </form>
                </Modal>
            )}

            {/* Delete */}
            {open && open.mode === "delete" && (
                <Modal open onOpenChange={() => setOpen(false)} title="Delete user">
                    <p>Delete “{open.user?.fullName}”?</p>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="light" onPress={() => setOpen(false)}>Cancel</Button>
                        <Button color="danger" onPress={() => {
                            start(async () => { try { await deleteUser(open.user!.id); setOpen(false); r.refresh(); } catch { setErr("Delete failed"); } });
                        }} isLoading={isP}>Delete</Button>
                    </div>
                    {err && <p className="text-sm text-red-600">{err}</p>}
                </Modal>
            )}
        </div>
    );
}
