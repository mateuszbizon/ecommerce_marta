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
    deliveryMethod: z.enum(["courier", "inpost", "inpost-courier", "own"], {
        error: "Wybierz jedną z opcji"
    }),
    inpostLocker: z
        .object({
            name: z.string(),
            address: z.string(),
            city: z.string(),
            postCode: z.string(),
        })
        .optional(),
})

// .superRefine((data, ctx) => {
//     if (data.deliveryMethod === "inpost" && !data.inpostLocker) {
//         ctx.addIssue({
//             code: "custom",
//             path: ["inpostLocker"],
//             message: "Wybierz paczkomat",
//         })
//     }
// })

export type CheckoutSchema = z.infer<typeof checkoutSchema>