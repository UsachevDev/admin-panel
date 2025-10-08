import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const c = await cookies();
  const token = c.get("token")?.value;
  redirect(token ? "/posts" : "/login");
}
