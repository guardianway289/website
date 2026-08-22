import { z } from "zod";

/**
 * Sanitizes input string by stripping HTML tags and trimming whitespace.
 */
export function sanitizeString(val: string): string {
  return val.replace(/<[^>]*>/g, "").trim();
}

/**
 * Sanitizes phone input by stripping dangerous characters while keeping digits, +, -, spaces, and parentheses.
 */
export function sanitizePhone(val: string): string {
  return val.replace(/[^0-9+\-\s()]/g, "").trim();
}

// Regex for validating phone numbers (allows international formats like +91 98765 43210, 10-digit numbers, etc.)
const phoneRegex = /^(\+?\d{1,4}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/;

// Number transformation helper that accepts string input or number input and returns a sanitized number or throws
const numericString = (fieldName: string, min = 0, max = 1000000, integerOnly = false) =>
  z.union([z.string(), z.number()])
    .transform((val, ctx) => {
      const strVal = String(val).trim();
      if (strVal === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${fieldName} is required.`,
        });
        return z.NEVER;
      }
      const num = Number(strVal);
      if (!Number.isFinite(num)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${fieldName} must be a valid number.`,
        });
        return z.NEVER;
      }
      if (integerOnly && !Number.isInteger(num)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${fieldName} must be a whole number.`,
        });
        return z.NEVER;
      }
      if (num < min) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${fieldName} cannot be less than ${min}.`,
        });
        return z.NEVER;
      }
      if (num > max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${fieldName} cannot exceed ${max}.`,
        });
        return z.NEVER;
      }
      return num;
    });

export const parentFormSchema = z.object({
  role: z.literal("parent"),
  name: z
    .string()
    .transform(sanitizeString)
    .pipe(
      z
        .string()
        .min(2, "Full name must be at least 2 characters.")
        .max(100, "Name is too long.")
    ),
  phone: z
    .string()
    .transform(sanitizePhone)
    .pipe(
      z
        .string()
        .min(7, "Phone number must be at least 7 digits.")
        .max(20, "Phone number is too long.")
        .regex(phoneRegex, "Please enter a valid phone number.")
    ),
  email: z
    .string()
    .transform(sanitizeString)
    .transform((val) => val.toLowerCase())
    .pipe(
      z
        .string()
        .refine((val) => val === "" || z.string().email().safeParse(val).success, {
          message: "Please enter a valid email address.",
        })
    )
    .optional()
    .default(""),
  school: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(2, "School name is required.")),
  locality: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(2, "Home locality / area is required.")),
  distance: numericString("Distance", 0, 500),
  transport: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(1, "Please select current transport.")),
  travelHours: numericString("Travel hours", 0, 24, true),
  travelMinutes: numericString("Travel minutes", 0, 59, true),
  monthlyCost: numericString("Monthly cost", 0, 1000000),
  childGrade: z
    .string()
    .transform(sanitizeString)
    .optional()
    .default(""),
  matters: z
    .array(z.string().transform(sanitizeString))
    .optional()
    .default([]),
  timeline: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(1, "Please select when you need the service.")),
  callTime: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(1, "Please select preferred call time.")),
});

export const institutionFormSchema = z.object({
  role: z.literal("institute"),
  name: z
    .string()
    .transform(sanitizeString)
    .pipe(
      z
        .string()
        .min(2, "Contact person name must be at least 2 characters.")
        .max(100, "Name is too long.")
    ),
  phone: z
    .string()
    .transform(sanitizePhone)
    .pipe(
      z
        .string()
        .min(7, "Phone number must be at least 7 digits.")
        .max(20, "Phone number is too long.")
        .regex(phoneRegex, "Please enter a valid phone number.")
    ),
  email: z
    .string()
    .transform(sanitizeString)
    .transform((val) => val.toLowerCase())
    .pipe(z.string().email("Please enter a valid work email address.")),
  organization: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(2, "Institution name is required.")),
  designation: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(1, "Please select your designation.")),
  location: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(2, "Institution location is required.")),
  studentCount: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(1, "Please select approx. number of students.")),
  setup: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(1, "Please select current student transportation setup.")),
  timeline: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(1, "Please select timeline.")),
  callTime: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(1, "Please select preferred call time.")),
});

export const contactFormSchema = z.discriminatedUnion("role", [
  parentFormSchema,
  institutionFormSchema,
]);

export type ParentFormInputs = z.infer<typeof parentFormSchema>;
export type InstitutionFormInputs = z.infer<typeof institutionFormSchema>;
export type ContactFormValidatedPayload = z.infer<typeof contactFormSchema>;

/**
 * Helper to validate raw form data and return either sanitized data or field errors.
 */
export function validateContactForm(data: unknown):
  | { success: true; data: ContactFormValidatedPayload }
  | { success: false; errors: Record<string, string> } {
  const result = contactFormSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const fieldName = issue.path[issue.path.length - 1];
    if (fieldName && typeof fieldName === "string" && !errors[fieldName]) {
      errors[fieldName] = issue.message;
    }
  }

  return { success: false, errors };
}
