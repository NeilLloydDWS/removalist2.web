import { z } from "zod/v4";

export const signupSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  companyName: z.string().min(1, "Company name is required"),
  region: z.enum(["NZ", "AU", "GB", "US", "Other"]),
  agreedToTerms: z.literal(true, {
    error: "You must agree to the Terms of Service and Privacy Policy",
  }),
});

export type SignupFormData = z.infer<typeof signupSchema>;

export const companySetupSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  phone: z.string().optional(),
  email: z.email("Please enter a valid email").optional().or(z.literal("")),
  address: z.string().optional(),
  timezone: z.string().min(1, "Timezone is required"),
  taxNumber: z.string().optional(),
});

export type CompanySetupData = z.infer<typeof companySetupSchema>;

export const truckSchema = z.object({
  name: z.string().min(1, "Truck name is required"),
  color: z.string().min(1, "Color is required"),
  capacity: z.string().optional(),
  registration: z.string().optional(),
});

export type TruckData = z.infer<typeof truckSchema>;

export const teamInviteSchema = z.object({
  email: z.email("Please enter a valid email"),
  role: z.enum(["Admin", "Operator", "Driver"]),
});

export type TeamInviteData = z.infer<typeof teamInviteSchema>;

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Please enter a valid email address"),
  companyName: z.string().optional(),
  region: z.enum(["NZ", "AU", "UK", "US", "Other"]),
  enquiryType: z.enum([
    "General Question",
    "Sales Enquiry",
    "Partnership",
    "Support",
    "Other",
  ]),
  message: z.string().min(1, "Message is required"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const demoRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Please enter a valid email address"),
  companyName: z.string().min(1, "Company name is required"),
  numberOfTrucks: z.string().optional(),
  region: z.enum(["NZ", "AU", "UK", "US", "Other"]),
  preferredDate: z.string().optional(),
  aboutBusiness: z.string().optional(),
});

export type DemoRequestFormData = z.infer<typeof demoRequestSchema>;
