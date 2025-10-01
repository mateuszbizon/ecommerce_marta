import { EMAIL_INCORRECT, INPUT_REQUIRED } from "@/constants/vallidations"
import { z } from "zod"

export const checkoutSchema = z.object({
    name: z.string().min(1, INPUT_REQUIRED),
    surname: z.string().min(1, INPUT_REQUIRED),
    email: z.email(EMAIL_INCORRECT),
    country: z.string().min(1, INPUT_REQUIRED),
    street: z.string().min(1, INPUT_REQUIRED),
    postalCode: z.string().min(1, INPUT_REQUIRED),
    city: z.string().min(1, INPUT_REQUIRED),
    phoneNumber: z.string().min(1, INPUT_REQUIRED),
})

export type CheckoutSchema = z.infer<typeof checkoutSchema>