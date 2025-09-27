import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, writeClientToken } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: writeClientToken,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
