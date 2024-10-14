'use server';
import { Device, DeviceResponse, getAllDevicesProp } from './deviceActions';

let cart: Device[] = [];

export const addToCart = async (device: Device) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			cart.push(device);
			console.log('Device added to cart');
			resolve(true);
		}, 200); // Simulating server delay
	});
};

export const removeFromCart = async (deviceId: Device) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			cart = cart.filter((v) => v._id === deviceId._id);
			// cart.pop(device);
			console.log('Device added to cart');
			resolve(true);
		}, 200); // Simulating server delay
	});
};

export const getCart = async () => {
	console.log('Get Cart');
	return new Promise<getAllDevicesProp>((resolve) => {
		setTimeout(() => {
			resolve(cart);
		}, 100); // Simulating server delay
	});
};
