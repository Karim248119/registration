import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(255, { message: "Name must be between 1 and 255 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    password_confirmation: z.string().min(6, {
      message: "Password confirmation must be at least 6 characters",
    }),
    mobile: z
      .string()
      .min(1, { message: "Mobile number is required" })
      .regex(/^\d+$/, { message: "Invalid mobile number" }),
    client_type: z
      .string()
      .min(1, { message: "Client type is required" })
      .refine((value) => ["MY_COMPANY", "B2C", "B2B"].includes(value), {
        message: "Invalid client type",
      }),
    issuing_authority: z.string().optional(),
    company_name: z.string().optional(),
    commercial_license_number: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.client_type === "B2B") {
      if (!data.issuing_authority) {
        ctx.addIssue({
          code: "custom",
          path: ["issuing_authority"],
          message: "Issuing authority is required for B2B client",
        });
      }
      if (!data.company_name) {
        ctx.addIssue({
          code: "custom",
          path: ["company_name"],
          message: "Company name is required for B2B client",
        });
      }
      if (!data.commercial_license_number) {
        ctx.addIssue({
          code: "custom",
          path: ["commercial_license_number"],
          message: "Commercial license number is required for B2B client",
        });
      }
    }

    if (data.password !== data.password_confirmation) {
      ctx.addIssue({
        code: "custom",
        path: ["password_confirmation"],
        message: "Passwords do not match",
      });
    }
  });

export const signinScheme = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
