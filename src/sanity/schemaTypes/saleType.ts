import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const saleType = defineType({
    name: 'sale',
    title: 'Zniżki',
    type: 'document',
    icon: TagIcon,
    fields: [
        defineField({
            name: "name",
            title: "Nazwa",
            type: "string",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "description",
            title: "Opis",
            type: "text",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "discountAmount",
            title: "Wysokość obniżki",
            type: "number",
        }),
        defineField({
            name: "couponCode",
            title: "Kod kuponu",
            type: "string",
        }),
        defineField({
            name: "validFrom",
            title: "Ważne od",
            type: "datetime",
        }),
        defineField({
            name: "validUntil",
            title: "Ważne do",
            type: "datetime",
        }),
        defineField({
            name: "isActive",
            title: "Czy jest aktywne",
            type: "boolean",
            initialValue: false
        }),
    ],
})