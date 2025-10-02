import { writeClient } from '@/sanity/lib/writeClient'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    if (evt.type === 'user.created') {
        const { id, email_addresses, first_name, last_name } = evt.data
        const eventType = evt.type

        const result = await writeClient.create({
            _type: 'user',
            clerkId: id,
            name: `${first_name || ''} ${last_name || ''}`.trim(),
            email: email_addresses[0]?.email_address,
        })

        console.log(result)
        console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
        console.log('Webhook payload:', evt.data)
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}