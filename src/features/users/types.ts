export type User = {
    id: number; fullName: string; email: string;
    phone?: string; role: "user" | "admin"; active: boolean; avatarUrl?: string;
};
