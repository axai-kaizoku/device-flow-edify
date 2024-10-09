import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret });
	const { pathname } = req.nextUrl;

	const userRoutes = ['/profile', '/devices', '/devices/(.*)'];

	// Use regex to match dynamic routes
	const commonRoutes = ['/', '/teams', '/teams/(.*)'];
	// '/people',
	// 	'/people/(.*)',
	// '/org-chart',
	const adminRoutes = [
		'/assets',
		'/assets/(.*)',

		'/settings',
		'/onboarding',
		'/store',
		'/store/(.*)',
		'/store/cart',
		'/issues',
		'/issues/(.*)',
	];

	// If already logged in redirect to home page
	if (token && pathname === '/login') {
		const home = new URL('/', req.url);
		return NextResponse.redirect(home);
	}

	if (pathname === '/login') {
		return NextResponse.next();
	}

	// Check for token and role-based restrictions
	if (
		new RegExp(
			`^(${[...commonRoutes, ...adminRoutes, ...userRoutes].join('|')})$`,
		).test(pathname)
	) {
		// If token is missing, redirect to login
		if (!token) {
			const loginUrl = new URL('/login', req.url);
			return NextResponse.redirect(loginUrl);
		}

		// Check for admin route protection
		if (adminRoutes.some((route) => new RegExp(`^${route}$`).test(pathname))) {
			if (token.role !== 2) {
				const home = new URL('/error', req.url);
				return NextResponse.redirect(home);
			}
		}

		// Check for user route protection
		if (userRoutes.some((route) => new RegExp(`^${route}$`).test(pathname))) {
			if (token.role === 2) {
				const home = new URL('/error', req.url);
				return NextResponse.redirect(home);
			}
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/((?!login$).*)',
		'/assets',
		'/assets/:path*',
		'/teams/:path*', // Protect dynamic routes under /teams/
		'/devices',
		'/devices/:path*',
		// '/people',
		// '/people/:path*',
		'/settings',
		'/onboarding',
		'/store',
		'/store/:path*',
		'/store/cart',
		// '/org-chart',
		'/profile',
		'/((?!api|_next/static|assets|_next/image|.*\\.png$).*)', // Protect all other routes
	],
};
