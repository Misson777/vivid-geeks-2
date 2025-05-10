"use server";
import { LoginData } from "@/queries/auth/types";
import { cookies } from "next/headers";
import { ActionResponse } from "../types";

export const login = async (data: LoginData): Promise<ActionResponse<null>> => {
  try {
    const { email, password } = data;

    if (!email || !password) throw new Error("Email and password are required");

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      throw new Error("Invalid email or password");
    }

    const token = btoa(`${email}:${password}`);

    const cookieStore = await cookies();

    // Set HTTP-only cookie
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return {
      message: "Login successful",
      success: true,
      data: null,
    };
  } catch {
    return {
      message: "Invalid email or password",
      success: false,
      data: null,
    };
  }
};

export const logout = async (): Promise<ActionResponse<null>> => {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  return {
    message: "Logout successful",
    success: true,
    data: null,
  };
};
