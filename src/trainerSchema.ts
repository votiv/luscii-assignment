import { z } from "zod"

export const trainerSchema = z.object({
  name: z.string().min(1, { message: "Name is required!" }),
  email: z.string().min(1, { message: "Email is required!" }).email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number is required and needs to be at least 10 digits!" })
    .max(14, { message: "Phone number must contain a maximum of 14 digits!" }),
})

export type TrainerFormData = z.infer<typeof trainerSchema>
