import {UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const userType = defineType({
  name: 'author',
  title: 'Użytkownicy',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: "Imię i nazwisko"
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: "Adres email"
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: "Zdjęcie",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})