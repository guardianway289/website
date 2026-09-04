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
        .min(2, "Please enter your full name.")
        .max(100, "Name is too long.")
    ),
  phone: z
    .string()
    .transform(sanitizePhone)
    .pipe(
      z
        .string()
        .min(7, "Please enter your phone number so we can reach you.")
        .max(20, "Phone number is too long.")
        .regex(phoneRegex, "Please enter a valid phone number so we can reach you.")
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
    .pipe(z.string().min(2, "Please enter your child's school name.")),
  locality: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(2, "Please enter your home locality / area.")),
  distance: numericString("Approximate distance", 0, 500),
  transport: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(1, "Please select how your child travels today.")),
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
    .pipe(z.string().min(1, "Please select when you would like to start.")),
  callTime: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(1, "Please select when we should call you.")),
});

export const institutionFormSchema = z.object({
  role: z.literal("institute"),
  name: z
    .string()
    .transform(sanitizeString)
    .pipe(
      z
        .string()
        .min(2, "Please enter the contact person's full name.")
        .max(100, "Name is too long.")
    ),
  phone: z
    .string()
    .transform(sanitizePhone)
    .pipe(
      z
        .string()
        .min(7, "Please enter your phone number so we can reach you.")
        .max(20, "Phone number is too long.")
        .regex(phoneRegex, "Please enter a valid phone number so we can reach you.")
    ),
  email: z
    .string()
    .transform(sanitizeString)
    .transform((val) => val.toLowerCase())
    .pipe(z.string().email("Please enter a valid work email address.")),
  organization: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(2, "Please enter your institution name.")),
  designation: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(1, "Please select your designation.")),
  location: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(2, "Please enter institution location.")),
  studentCount: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(1, "Please select approximate student strength.")),
  setup: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(1, "Please select current student transportation setup.")),
  timeline: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(1, "Please select when you are looking to explore this.")),
  callTime: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(1, "Please select preferred time to call.")),
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

/**
 * Validates a single step of the form for the active role.
 * Returns errors for fields in that step if validation fails.
 */
export function validateStep(
  role: "parent" | "institute",
  step: number,
  formData: Record<string, any>
): { success: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (role === "parent") {
    if (step === 1) {
      // Validate name, phone, email (if provided), school, locality
      const nameRes = parentFormSchema.shape.name.safeParse(formData.name);
      if (!nameRes.success) errors.name = nameRes.error.issues[0].message;

      const phoneRes = parentFormSchema.shape.phone.safeParse(formData.phone);
      if (!phoneRes.success) errors.phone = phoneRes.error.issues[0].message;

      if (formData.email) {
        const emailRes = parentFormSchema.shape.email.safeParse(formData.email);
        if (!emailRes.success) errors.email = emailRes.error.issues[0].message;
      }

      const schoolRes = parentFormSchema.shape.school.safeParse(formData.school);
      if (!schoolRes.success) errors.school = schoolRes.error.issues[0].message;

      const localityRes = parentFormSchema.shape.locality.safeParse(formData.locality);
      if (!localityRes.success) errors.locality = localityRes.error.issues[0].message;
    } else if (step === 2) {
      // Validate transport, distance, travelHours, travelMinutes, monthlyCost
      const transportRes = parentFormSchema.shape.transport.safeParse(formData.transport);
      if (!transportRes.success) errors.transport = transportRes.error.issues[0].message;

      const distanceRes = parentFormSchema.shape.distance.safeParse(formData.distance);
      if (!distanceRes.success) errors.distance = distanceRes.error.issues[0].message;

      const travelHoursRes = parentFormSchema.shape.travelHours.safeParse(formData.travelHours);
      if (!travelHoursRes.success) errors.travelHours = travelHoursRes.error.issues[0].message;

      const travelMinutesRes = parentFormSchema.shape.travelMinutes.safeParse(formData.travelMinutes);
      if (!travelMinutesRes.success) errors.travelMinutes = travelMinutesRes.error.issues[0].message;

      const monthlyCostRes = parentFormSchema.shape.monthlyCost.safeParse(formData.monthlyCost);
      if (!monthlyCostRes.success) errors.monthlyCost = monthlyCostRes.error.issues[0].message;
    } else if (step === 3) {
      // Validate timeline, callTime
      const timelineRes = parentFormSchema.shape.timeline.safeParse(formData.timeline);
      if (!timelineRes.success) errors.timeline = timelineRes.error.issues[0].message;

      const callTimeRes = parentFormSchema.shape.callTime.safeParse(formData.callTime);
      if (!callTimeRes.success) errors.callTime = callTimeRes.error.issues[0].message;
    }
  } else {
    // Institution flow
    if (step === 1) {
      // Validate name, phone, email
      const nameRes = institutionFormSchema.shape.name.safeParse(formData.name);
      if (!nameRes.success) errors.name = nameRes.error.issues[0].message;

      const phoneRes = institutionFormSchema.shape.phone.safeParse(formData.phone);
      if (!phoneRes.success) errors.phone = phoneRes.error.issues[0].message;

      const emailRes = institutionFormSchema.shape.email.safeParse(formData.email);
      if (!emailRes.success) errors.email = emailRes.error.issues[0].message;
    } else if (step === 2) {
      // Validate organization, designation, location, studentCount
      const orgRes = institutionFormSchema.shape.organization.safeParse(formData.organization);
      if (!orgRes.success) errors.organization = orgRes.error.issues[0].message;

      const desigRes = institutionFormSchema.shape.designation.safeParse(formData.designation);
      if (!desigRes.success) errors.designation = desigRes.error.issues[0].message;

      const locRes = institutionFormSchema.shape.location.safeParse(formData.location);
      if (!locRes.success) errors.location = locRes.error.issues[0].message;

      const countRes = institutionFormSchema.shape.studentCount.safeParse(formData.studentCount);
      if (!countRes.success) errors.studentCount = countRes.error.issues[0].message;
    } else if (step === 3) {
      // Validate setup, timeline, callTime
      const setupRes = institutionFormSchema.shape.setup.safeParse(formData.setup);
      if (!setupRes.success) errors.setup = setupRes.error.issues[0].message;

      const timelineRes = institutionFormSchema.shape.timeline.safeParse(formData.timeline);
      if (!timelineRes.success) errors.timeline = timelineRes.error.issues[0].message;

      const callTimeRes = institutionFormSchema.shape.callTime.safeParse(formData.callTime);
      if (!callTimeRes.success) errors.callTime = callTimeRes.error.issues[0].message;
    }
  }

  return {
    success: Object.keys(errors).length === 0,
    errors,
  };
}

