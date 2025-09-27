import { type SchemaTypeDefinition } from 'sanity'
import { productType } from './productType'
import { orderType } from './orderType'
import { userType } from './userType'
import { categoryType } from './categoryType'
import { saleType } from './saleType'
import { blockContentType } from './blockContentType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, orderType, userType, categoryType, saleType, blockContentType],
}