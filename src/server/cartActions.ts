'use server';
import { AxiosError } from 'axios';
import { Device } from './deviceActions';
import { callAPIWithToken, getSession } from './helper';

export type DeviceWithQty = Device & { quantity: number };

export const removeItemFromCart = async (itemId: string): Promise<void> => {
	try {
		// Make the DELETE request to remove the item from the cart
		await callAPIWithToken(
			`https://api.edify.club/edifybackend/v1/cart/item/quantity`,
			'PATCH',
			{ itemId, quantity: 1 },
		);
		console.log(`Item with ID ${itemId} removed from cart`);
	} catch (error) {
		console.error('Error removing item from cart:', error);
		throw new Error((error as AxiosError).message);
	}
};

export const getCart = async () => {
	const sess = await getSession(); // Fetch session details

	try {
		if (sess?.user && sess.user.id) {
			// Fetch Cart data
			const response = await callAPIWithToken<any>(
				`https://api.edify.club/edifybackend/v1/cart`,
				'GET',
			);

			// console.log('Fetched Cart:', response.data);
			return response.data; // Return the cart data
		} else {
			throw new Error('No user session found');
		}
	} catch (error: any) {
		console.error('Error fetching cart:', error);
		throw new Error(error.message || 'Failed to fetch cart');
	}
};

export const updateCartItemQuantity = async (
	itemId: string,
	quantity: number,
): Promise<void> => {
	try {
		const response = await callAPIWithToken<any>(
			`https://api.edify.club/edifybackend/v1/cart/item/quantity`,
			'PATCH',
			{ itemId: itemId, quantity: quantity },
		);
		console.log(
			`Updated quantity for item ${itemId}:`,
			response.data.cart.items,
		);
	} catch (error) {
		console.error('Error updating item quantity in cart:', error);
		throw new Error((error as AxiosError).message);
	}
};

export async function addItemToCart(
	itemId: string,
	quantity: number,
	addressId?: string | null,
) {
	try {
		const payload = {
			item: {
				itemId,
				quantity,
			},
			addressId: '6704c1de78d41ea73950ea71',
		};
		console.log(payload);
		const apiUrl = 'https://api.edify.club/edifybackend/v1/cart/addItem';

		const response = await callAPIWithToken(apiUrl, 'POST', payload);
		console.log('Item added to cart:', response.data);
		return response.data;
	} catch (error: any) {
		console.error('Failed to add item to cart:', error);
		throw new Error(error.response || 'Failed to add item to cart.');
	}
}

export const getPaymentMethods = async (price: number) => {
	const sess = await getSession(); // Fetch session details

	try {
		if (sess?.user && sess.user.id) {
			// Fetch Cart data
			const response = await callAPIWithToken<any>(
				`https://api.edify.club/edifybackend/v1/payments/methods?amount=${price}`,
				'GET',
			);

			// console.log('Fetched Cart:', response.data);
			return response.data; // Return the cart data
		} else {
			throw new Error('No user session found');
		}
	} catch (error: any) {
		console.error('Error fetching cart:', error);
		throw new Error(error.message || 'Failed to fetch payment methods');
	}
};

export async function createOrderId(amount: number, paymentOption: string) {
	try {
		const payload = {
			amount,
			paymentOption,
		};
		console.log(payload);
		const apiUrl = 'https://api.edify.club/edifybackend/v1/payments/initiate';

		const response = await callAPIWithToken(apiUrl, 'POST', payload);
		console.log('OrderID Created', response.data);
		// return response.data;
		const orderId = response.data.orderId;
		const paymentMethod = response.data.paymentOption;

		const checkoutPayload = {
			payment_mode: paymentMethod,
			orderId,
		};
		const checkoutUrl = 'https://api.edify.club/edifybackend/v1/cart/checkout';

		const checkoutRes = await callAPIWithToken(
			checkoutUrl,
			'POST',
			checkoutPayload,
		);
		console.log(checkoutRes.data);
		return checkoutRes.data;
	} catch (error: any) {
		console.error('Failed to create orderID:', error);
		throw new Error(error.response || 'Failed to create orderID.');
	}
}
