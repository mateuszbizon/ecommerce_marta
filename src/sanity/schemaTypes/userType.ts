import {UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const userType = defineType({
  name: 'user',
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
      name: 'clerkId',
      type: 'string',
      title: 'Clerk ID',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})