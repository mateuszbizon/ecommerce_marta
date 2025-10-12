import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
    name: 'order',
    title: 'Zamówienia',
    type: 'document',
    icon: BasketIcon,
    fields: [
        defineField({
            name: "orderNumber",
            title: "Numer zamówienia",
            type: "string",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "stripeCustomerId",
            title: "Stripe Customer Id",
            type: "string",
        }),
        defineField({
            name: "customerName",
            title: "Imię i nazwisko zamawiającego",
            type: "string",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "customerEmail",
            title: "Adres email zamawiającego",
            type: "string",
            validation: (rule) => rule.required().email()
        }),
        defineField({
            name: "customerCountry",
            title: "Kraj zamawiającego",
            type: "string",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "customerStreet",
            title: "Ulica zamawiającego",
            type: "string",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "customerPostalCode",
            title: "Kod pocztowy zamawiającego",
            type: "string",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "customerCity",
            title: "Miasto zamawiającego",
            type: "string",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "customerPhoneNumber",
            title: "Numer telefonu zamawiającego",
            type: "string",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "customerCompany",
            title: "Firma zamawiającego (opcjonalne)",
            type: "string",
        }),
        defineField({
            name: "stripePaymentIntentId",
            title: "Stripe Payment Intent Id",
            type: "string",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "products",
            title: "Zamówione produkty",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "product",
                            title: "Produkt",
                            type: "reference",
                            to: [{ type: "product" }]
                        }),
                        defineField({
                            name: "quantity",
                            title: "Ilość",
                            type: "number",
                        }),
                    ],
                    preview: {
                        select: {
                            product: "product.name",
                            image: "product.image",
                            quantity: "quantity",
                            price: "product.price"
                        },
                        prepare(select) {
                            return {
                                title: `${select.product} x ${select.quantity}`,
                                subtitle: `${select.price * select.quantity}`,
                                media: select.image
                            }
                        }
                    }
                })
            ]
        }),
        defineField({
            name: "totalPrice",
            title: "Całkowita cena",
            type: "number",
            validation: (rule) => rule.required().min(0)
        }),
        defineField({
            name: "currency",
            title: "Waluta",
            type: "string",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "amountDiscount",
            title: "Ilość obniżki",
            type: "number",
            validation: (rule) => rule.min(0)
        }),
        defineField({
            name: "status",
            title: "Status zamówienia",
            type: "string",
            options: {
                list: [
                    { title: "Oczekujące", value: "pending" },
                    { title: "Opłacone", value: "paid" },
                    { title: "Wysłane", value: "shipped" },
                    { title: "Dostarczone", value: "delivered" },
                    { title: "Anulowane", value: "cancelled" },
                ]
            }
        }),
        defineField({
            name: "orderDate",
            title: "Data zamówienia",
            type: "datetime",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "user",
            title: "Użytkownik",
            type: "reference",
            to: [{ type: "user" }],
        }),
        defineField({
            name: "deliveryMethod",
            title: "Metoda dostawy",
            type: "string",
            options: {
                list: [
                    { title: "Kurier", value: "courier" },
                    { title: "InPost Paczkomat", value: "inpost" },
                    { title: "InPost Kurier", value: "inpost-courier" },
                    { title: "Odbiór własny", value: "own" },
                ]
            },
            validation: (rule) => rule.required()
        }),
    ],
    preview: {
        select: {
            name: "customerName",
            amount: "totalPrice",
            currency: "currency",
            orderId: "orderNumber",
            email: "customerEmail"
        },
        prepare(select) {
            const orderIdSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`

            return {
                title: `${select.name} ${orderIdSnippet}`,
                subtitle: `${select.amount} ${select.currency} ${select.email}`,
                media: BasketIcon
            }
        }
    }
})