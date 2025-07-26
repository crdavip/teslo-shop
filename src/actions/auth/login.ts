"use server";

import { signIn } from "@/auth.config";

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return "Success";
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialsSignin";
    }
    return "UnknownError";
  }
}

export const loginUser = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password });
    return {
      ok: true,
    };
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return {
        ok: false,
        message: "CredentialsSignin",
      };
    }
    return {
      ok: false,
      message: "UnknownError",
    };
  }
};
