import { z } from "zod";
export const UserSchema = z.object({
    fullName: z.string().min(1, "Required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(5).optional().or(z.literal("")),
    role: z.enum(["user", "admin"]),
    active: z.boolean(),
    password: z.string().min(6).optional(), // только при создании
});
export type UserInput = z.infer<typeof UserSchema>;
