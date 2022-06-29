import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
export type LoginDto = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z.string().email(),
    firstName: z.string().min(1, {
      message: "First Name is required",
    }),
    lastName: z.string().min(1, {
      message: "Last Name is required",
    }),
    password: z
      .string()
      .min(1, {
        message: "Password is required",
      })
      .trim(),
    confirmPassword: z
      .string()
      .min(1, {
        message: "Password confirmation is required",
      })
      .trim(),
  })
  .refine(
    (data) => {
      console.log(
        data.password,
        data.password.trim(),
        data.password === data.password.trim()
      );
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );
export type RegisterDto = z.infer<typeof registerSchema>;
