// types.ts

// Define the structure for each section of the form
export interface BasicDetails {
	_id?: string;
	os: string;
	model: string;
	processor: string;
	ram: string;
	storage: string;
	device_name: string;
}

export interface AdvanceDeviceDetails {
	_id?: string;
	serialNumber: string;
	invoiceFile: File | null;
	purchaseDate: string;
	warrantyExpiryDate: string;
}

export interface assignedToObj {
    name: string;
    value: string;
}

export interface ExtraDetails {
	_id?: string;
	brand: string;
	assignedTo: assignedToObj;
	officeLocation: assignedToObj;
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
