// types.ts

// Define the structure for each section of the form
export interface BasicDetails {
	os: string;
	model: string;
	processor: string;
	ram: string;
	storage: string;
	device_name: string;
}

export interface AdvanceDeviceDetails {
	serialNumber: string;
	invoiceFile: File | null;
	purchaseDate: string;
	warrantyExpiryDate: string;
}

export interface ExtraDetails {
	brand: string;
	assignedTo: string;
	officeLocation: string;
	purchaseOrder: string;
	purchaseValue: number;
	ownership: string;
	image: string;
}

// Combined FormData interface
export interface FormData {
	deviceType: string;
	basicDetails: BasicDetails;
	advanceDeviceDetails: AdvanceDeviceDetails;
	extraDetails: ExtraDetails;
}

// FormErrors interface using Partial and nested keys
export type FormErrors = Partial<
	Record<
		| keyof BasicDetails
		| keyof AdvanceDeviceDetails
		| keyof ExtraDetails
		| 'deviceType',
		string
	>
>;
