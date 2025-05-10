import { useMutation } from "@tanstack/react-query";
import { LoginData } from "./types";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { login, logout } from "./actions";

export const useLogin = () => {
  const router = useRouter();
  const pathname = usePathname();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await login(data);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred");
    },
    onSuccess: () => {
      toast.success("Login successful");
      router.replace(pathname.replace("/login", "/admin"));
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const pathname = usePathname();

  return useMutation({
    mutationFn: async () => {
      const response = await logout();
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred");
    },
    onSuccess: () => {
      toast.success("Logout successful");
      router.replace(pathname.replace("/admin", "/login"));
    },
  });
};
