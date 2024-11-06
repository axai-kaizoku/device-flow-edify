import { AxiosError } from "axios";
import { callAPIWithToken } from "./helper";

// Define the structure of a Previous Order
export interface PreviousOrder {
	_id: string;
	itemId: string;
	userId: string;
	orgId: string;
	cartId: string;
	quantity: number;
	price: number;
	createdAt: string;
	updatedAt: string;
}


// Fetch Previous Orders
export async function getPreviousOrders(): Promise<PreviousOrder[]> {
	try {
		// API call to fetch previous orders
		const res = await callAPIWithToken<{ soldInventory: PreviousOrder[] }>(
			'https://api.edify.club/edifybackend/v1/soldInventory/org',
			'GET',
		);

		// Validate response structure
		if (!res.data || !Array.isArray(res.data.soldInventory)) {
			throw new Error('Invalid API response structure');
		}

		return res.data.soldInventory;
	} catch (e) {
		console.error('Error fetching previous orders:', e);
		throw new Error((e as AxiosError).message || 'Failed to fetch previous orders');
	}
}
