import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { getUserByClerkId } from './sanity/lib/users/getUserByClerkId';
import { NextResponse } from 'next/server';

const protectedAdminRoutes = createRouteMatcher(["/zamowienia(.*)"])
const protectedRoutes = createRouteMatcher(["/twoje-zamowienia"])

export default clerkMiddleware(async (auth, req) => {
    if (protectedAdminRoutes(req)) {
        const user = await auth()
        
        if (!user.userId) {
            await auth.protect();
            return
        }

        const sanityUser = await getUserByClerkId(user.userId);

        if (!sanityUser || !sanityUser.isAdmin) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    if (protectedRoutes(req)) await auth.protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
  ],
};