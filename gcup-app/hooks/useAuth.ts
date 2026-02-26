// hooks/useAuth.ts
import { useRouter } from "expo-router";
import { saveSession, getUser } from "../store/session";
import { postJSON } from "../services/api";

export function useAuth() {
  const router = useRouter();

  async function login(email: string, password: string) {
    const res = await postJSON("/auth/login", { email, password });
    // server must return { user: { id, role }, token }
    const { user, token } = res;
    if (!user || !token) throw new Error("Invalid login response");
    await saveSession(token, user);
    // strict routing based on server role
    if (user.role === "staff") return router.replace("/(staff)/dashboard");
    if (user.role === "carpenter") return router.replace("/(carpenter)/dashboard");
    if (user.role === "admin") return router.replace("/(admin)/dashboard");
    throw new Error("Unknown role");
  }

  return { login, getUser };
}