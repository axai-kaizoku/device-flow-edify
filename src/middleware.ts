import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret });
	const { pathname } = req.nextUrl;

	const protectedRoutes = [
		'/',
		'/assets',
		'/teams',
		'/devices',
		'/users',
		'/settings',
		'/((?!api|_next/static|assets|_next/image|.*\\.png$).*)',
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
		'/',
		'/assets',
		'/teams',
		'/devices',
		'/users',
		'/settings',
		'/((?!api|_next/static|assets|_next/image|.*\\.png$).*)',
	], // Define protected routes here
};
