// middleware.js
import { NextResponse } from 'next/server';

const protectedRoutes = ['/account', '/dashboard', '/profile'];

export async function middleware(request) {
    const url = request.nextUrl;
    const path = url.pathname;

    // Если путь не защищён — пропускаем
    if (!protectedRoutes.some(route => path.startsWith(route))) {
        return NextResponse.next();
    }

    // Достаём токен из cookies
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
        // Редиректим на /login
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        return NextResponse.next();
    } catch (err) {
        console.error("Auth middleware error:", err);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}


export const config = {
    matcher: ['/account/:path*', '/dashboard/:path*', '/profile/:path*']
};