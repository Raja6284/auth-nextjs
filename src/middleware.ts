import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname

    const isPublic = path === '/login' || path === '/signup' || path === '/verifyemail'

    const token = request.cookies.get('token')?.value || "" 


    const isProtectedRoute = path.startsWith('/profile') 

    if(isPublic && token){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if(isProtectedRoute && !token){
      return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

    if(!isPublic && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile/:path*',
    '/login',
    '/signup',
    '/verifyemail',
    '/resetpassword'
  ]
}