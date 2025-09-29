import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
    name: 'product',
    title: 'Produkty',
    type: 'document',
    icon: TrolleyIcon,
    fields: [
        defineField({
            name: "name",
            title: "Nazwa",
            type: "string",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name"
            },
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "image",
            title: "Zdjęcie",
            type: "image",
            options: {
                hotspot: true
            },
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "description",
            title: "Opis",
            type: "text",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "price",
            title: "Cena",
            type: "number",
            validation: (rule) => rule.required().min(0)
        }),
        defineField({
            name: "categories",
            title: "Kategorie",
            type: "array",
            of: [{ type: "reference", to: { type: "category" } }]
        }),
        defineField({
            name: "stock",
            title: "Ilość",
            type: "number",
            validation: (rule) => rule.min(0)
        }),
        defineField({
            name: "isFeatured",
            title: "Czy produkt ma być wyróżniony",
            type: "boolean",
            initialValue: false
        }),
    ],
    preview: {
        select: {
            title: "name",
            media: "image",
            subtitle: "price"
        },
        prepare(select) {
            return {
                title: select.title,
                media: select.media,
                subtitle: select.subtitle
            }
        }
    }
})