import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret });
	const { pathname } = req.nextUrl;

	// Define protected routes
	const protectedRoutes = [
		'/dashboard',
		'/',
		'/((?!api|_next/static|_next/image|.*\\.png$).*)',
	];

	if (protectedRoutes.includes(pathname)) {
		if (!token) {
			const loginUrl = new URL('/login', req.url);
			return NextResponse.redirect(loginUrl);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/dashboard',
		'/',
		'/((?!api|_next/static|_next/image|.*\\.png$).*)',
	], // Define protected routes here
	// matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api)(.*)'],
};
