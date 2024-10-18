'use server';
import { Device } from './deviceActions';

export type DeviceWithQty = Device & { qty?: number };

let cart: DeviceWithQty[] = [];

export const addToCart = async (device: DeviceWithQty) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const existingDevice = cart.find((d) => d._id === device._id);
			if (existingDevice) {
				existingDevice.qty = (existingDevice.qty || 1) + 1;
			} else {
				device.qty = 1; // Initialize quantity
				cart.push(device);
			}
			console.log('Device added to cart');
			resolve(true);
		}, 100); // Simulating server delay
	});
};

export const removeFromCart = async (device: DeviceWithQty) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const existingDevice = cart.find((d) => d._id === device._id);
			if (existingDevice) {
				if (existingDevice.qty === 1) {
					cart = cart.filter((d) => d._id !== device._id);
				} else {
					existingDevice.qty!--;
				}
			}
			console.log('Device removed from cart');
			resolve(true);
		}, 100); // Simulating server delay
	});
};

export const getCart = async () => {
	console.log('Get Cart');
	return new Promise<DeviceWithQty[]>((resolve) => {
		setTimeout(() => {
			resolve(cart);
		}, 100); // Simulating server delay
	});
};
