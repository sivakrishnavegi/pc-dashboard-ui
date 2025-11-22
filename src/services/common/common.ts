import { useUserStore } from "@/store/userStore";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await fetch("/api/users/logout", {
        method: "GET",
        credentials: "include",
      });

      useUserStore.getState().clearUser();
      await signOut({ redirect: true });

      // Redirect
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return { logout };
};

export default useLogout;
