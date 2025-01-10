import { FormData } from "./types";

export const createPayload = (formData: FormData) => {
    const { deviceType } = formData;
  
    let payload = {};
  
    switch (deviceType) {
      case "laptop":
        payload = {
          os: formData?.laptopPage1?.os,
          custom_model: formData?.laptopPage1?.model,
          processor: formData?.laptopPage1?.processor,
          ram: formData?.laptopPage1?.ram,
          storage: formData?.laptopPage1?.storage,
          device_name: formData?.laptopPage1?.device_name,
          brand: formData?.laptopPage1?.brand,
          condition: formData?.laptopPage1?.condition,
          serial_no: formData?.laptopPage2?.serialNumber,
          device_purchase_date: formData?.laptopPage2?.purchaseDate,
          warranty_expiary_date:formData?.laptopPage2?.warrantyExpiryDate,
          // invoice: formData.laptopPage2.invoiceFile
        };
        break;
  
      case "mobile":
        payload = {
          os: formData?.laptopPage1?.os,
          custom_model: formData?.laptopPage1?.model,
          processor: formData?.laptopPage1?.processor,
          ram: formData?.laptopPage1?.ram,
          storage: formData?.laptopPage1?.storage,
          device_name: formData?.laptopPage1?.device_name,
          brand: formData?.laptopPage1?.brand,
          condition: formData?.laptopPage1?.condition,
          serial_no: formData?.laptopPage2?.serialNumber,
          device_purchase_date: formData?.laptopPage2?.purchaseDate,
          warranty_expiary_date:formData?.laptopPage2?.warrantyExpiryDate,
          // invoice: formData.laptopPage2.invoiceFile
        };
        break;
  
      case "keyboard":
        payload = {
          custom_model: formData?.keyboardDetails?.model,
          brand: formData?.keyboardDetails?.brand,
          serial_no: formData?.keyboardDetails?.serialNumber,
          device_purchase_date: formData?.keyboardDetails?.purchaseDate,
          warranty_expiary_date:formData?.keyboardDetails?.warrantyExpiryDate,
          // invoice: formData.laptopPage2.invoiceFile
        };
        break;
  
      case "monitor":
        payload = {
          custom_model: formData?.keyboardDetails?.model,
          brand: formData?.keyboardDetails?.brand,
          serial_no: formData?.keyboardDetails?.serialNumber,
          device_purchase_date: formData?.keyboardDetails?.purchaseDate,
          warranty_expiary_date:formData?.keyboardDetails?.warrantyExpiryDate,
          // invoice: formData.monitorDetails.invoiceFile
        };
        break;
  
      case "mouse":
        payload = {
          custom_model: formData?.keyboardDetails?.model,
          brand: formData?.keyboardDetails?.brand,
          serial_no: formData?.keyboardDetails?.serialNumber,
          device_purchase_date: formData?.keyboardDetails?.purchaseDate,
          warranty_expiary_date:formData?.keyboardDetails?.warrantyExpiryDate,
          // invoice: formData.mouseDetails.invoiceFile
        };
        break;
  
      default:
        throw new Error("Unsupported device type.");
    }

  
    return {
      deviceType,
      ...payload, // Include details dynamically based on type
    };
  };
  