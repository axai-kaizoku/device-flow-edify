'use server';
import { Device } from './deviceActions';

var cart: any[] = [];

export const addToCart = async (device: Device) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			cart.push(device);
			console.log('Device added to cart');
			resolve(true);
		}, 200); // Simulating server delay
	});
};

export const removeFromCart = async (deviceId: string) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			cart = cart.filter((v) => v.id === deviceId);
			// cart.pop(device);
			console.log('Device added to cart');
			resolve(true);
		}, 200); // Simulating server delay
	});
};

export const getCart = async () => {
	console.log('Get Cart');
	return new Promise<any[]>((resolve) => {
		setTimeout(() => {
			resolve(cart);
		}, 100); // Simulating server delay
	});
};
