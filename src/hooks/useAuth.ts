import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        queryClient.invalidateQueries(["user"]);
        router.push("/dashboard");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      queryClient.invalidateQueries(["user"]);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return { user, login, logout };
};

export default useAuth;
