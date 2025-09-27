import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Kategorie',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: "Nazwa"
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: "Slug",
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: "Opis"
    }),
  ],
})