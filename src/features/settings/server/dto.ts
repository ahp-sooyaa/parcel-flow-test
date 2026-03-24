import { z } from "zod";

const signupPolicySchema = z.object({
  signupEnabled: z.boolean(),
});

export type SignupPolicyState = {
  success: boolean;
  message?: string;
};

export function parseSignupPolicyInput(formData: FormData) {
  return signupPolicySchema.safeParse({
    signupEnabled: formData.get("signupEnabled") === "on",
  });
}
