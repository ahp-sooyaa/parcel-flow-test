import { z } from "zod";

const signInSchema = z.object({
  email: z.email("Enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const signUpSchema = signInSchema;

export type AuthActionState = {
  success: boolean;
  message?: string;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
};

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;

export function parseSignInInput(formData: FormData) {
  return signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
}

export function parseSignUpInput(formData: FormData) {
  return signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
}

export function mapAuthErrorMessage(message: string | null) {
  if (!message) {
    return "Authentication failed. Please try again.";
  }

  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "Email or password is incorrect.";
  }

  if (normalized.includes("user already registered")) {
    return "This email is already registered. Please sign in.";
  }

  return message;
}
