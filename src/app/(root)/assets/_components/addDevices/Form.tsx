// Form.tsx

"use client";

import { Icon } from "@/components/wind/Icons";
import React, { useEffect, useState } from "react";
import DeviceType from "./deviceType";

import { createDevices, Device } from "@/server/deviceActions";
import { useRouter } from "next/navigation";
import AdvanceDeviceDetails from "./advanceDeviceDetails";
import ExtraDetails from "./extraDetails";
import {
  FormData,
  FormErrors,
  DevicePage1 as DevicePage1,
  AdvanceDeviceDetails as AdvanceDeviceDetailsInterface,
  ExtraDetails as ExtraDetailsInterface,
  KeyboardDetailsInterface,
  DevicePage2,
} from "./_components/types";
import Spinner from "@/components/Spinner";
import { ChevronLeft, ChevronRight, Laptop, Monitor } from "lucide-react";
import KeyboardForm from "./keyBoardForm";
import MouseForm from "./mouseForm";
import LaptopForm from "./laptopForm";
import LaptopForm2 from "./laptopForm2";
import MobileForm from "./MobileForm";
import MobileForm2 from "./MobileForm2";
import MonitorForm from "./MonitorForm";
import { createPayload } from "./_components/createPayload";
// import AssignAssetsForm from "../assignAssetsForm";
type FormProps = {
  closeBtn: () => void; // Define the type for closeBtn
};

function Form({ closeBtn }: FormProps) {
  const [step, setStep] = useState<number>(0);
  const [totalStep, setTotalStep] = useState<number>(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    deviceType: "",
    keyboardDetails: {
      model: "",
      invoiceFile: null,
      serialNumber: "",
      purchaseDate: "",
      warrantyExpiryDate: "",
      brand: "",
    },
    monitorDetails:{
      model: "",
      invoiceFile: null,
      serialNumber: "",
      purchaseDate: "",
      warrantyExpiryDate: "",
      brand: "",
    },
    mouseDetails: {
      model: "",
      invoiceFile: null,
      serialNumber: "",
      purchaseDate: "",
      warrantyExpiryDate: "",
      brand: "",
    },
    laptopPage1: {
      os: "",
      model: "",
      processor: "",
      ram: "",
      storage: "",
      device_name: "",
      brand:"",
      condition:"",
    },
    laptopPage2: {
      serialNumber: "",
      invoiceFile: null,
      purchaseDate: "",
      warrantyExpiryDate: "",
    },
    mobilePage1: {
      os: "",
      model: "",
      processor: "",
      ram: "",
      storage: "",
      device_name: "",
      brand:"",
      condition:"",
    },
    mobilePage2: {
      serialNumber: "",
      invoiceFile: null,
      purchaseDate: "",
      warrantyExpiryDate: "",
    },
  });

  // Utility function to update nested form data with better type safety
  const updateFormData = <K extends keyof FormData>(
    section: K,
    data: Partial<FormData[K]>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as object),
        ...data,
      },
    }));
  };
  const validate = (): boolean => {
    let currentErrors: FormErrors = {};
    const device1 = formData?.laptopPage1
    const m1 = formData?.mobilePage1;
    const device2 = formData?.laptopPage2
    const m2 = formData?.mobilePage2;
    const device3 = formData?.keyboardDetails || formData?.monitorDetails || formData?.mouseDetails;
    const monitor = formData?.monitorDetails;
    const keyboard = formData?.keyboardDetails;
    const mouse = formData?.mouseDetails;

    switch (step) {
      case 0:
        if (!formData?.deviceType) {
          currentErrors.deviceType = "Please select a device type.";
        }
        break;
      case 1:
        if (formData?.deviceType === 'laptop'){
          if (!device1?.os) {
            currentErrors.os = "Operating System is required.";
          }
          if (!device1?.brand) currentErrors.brand = "Brand is required.";
          if (!device1?.model) currentErrors.model = "Model is required.";
          if (!device1?.processor)
            currentErrors.processor = "Processor is required.";
          if (!device1?.ram) currentErrors.ram = "RAM is required.";
          if (!device1?.storage) currentErrors.storage = "Storage is required.";
          if (!device1?.condition)
            currentErrors.condition = "Device Condition is required.";
        }
        else if (formData?.deviceType === 'mobile'){
          if (!m1?.os) {
            currentErrors.os = "Operating System is required.";
          }
          if (!m1?.brand) currentErrors.brand = "Brand is required.";
          if (!m1?.model) currentErrors.model = "Model is required.";
          if (!m1?.processor)
            currentErrors.processor = "Processor is required.";
          if (!m1?.ram) currentErrors.ram = "RAM is required.";
          if (!m1?.storage) currentErrors.storage = "Storage is required.";
          if (!m1?.condition)
            currentErrors.condition = "Device Condition is required.";
          if (!m1?.device_name) currentErrors.device_name = "Device Name is required.";
        }
        else if (formData?.deviceType === 'monitor'){
          // if(!monitor?.invoiceFile) currentErrors.invoiceFile = "Incoice File is required.";
          if(!monitor?.model) currentErrors.model = "Model is required.";
          if (!monitor?.brand) currentErrors.brand = "Brand is required.";
          if (!monitor?.serialNumber) currentErrors.serialNumber = "Serial Number is required";
          if (!monitor?.purchaseDate) currentErrors.purchaseDate = "Purchase Date is required";
          if (!monitor?.warrantyExpiryDate) currentErrors.warrantyExpiryDate = "Warranty Expiry Date is required";
        }
        else if (formData?.deviceType === 'mouse'){
          // if(!mouse?.invoiceFile) currentErrors.invoiceFile = "Incoice File is required.";
          if(!mouse?.model) currentErrors.model = "Model is required.";
          if (!mouse?.brand) currentErrors.brand = "Brand is required.";
          if (!mouse?.serialNumber) currentErrors.serialNumber = "Serial Number is required";
          if (!mouse?.purchaseDate) currentErrors.purchaseDate = "Purchase Date is required";
          if (!mouse?.warrantyExpiryDate) currentErrors.warrantyExpiryDate = "Warranty Expiry Date is required";
        }
        else if (formData?.deviceType === 'keyboard'){
          // if(!keyboard?.invoiceFile) currentErrors.invoiceFile = "Incoice File is required.";
          if(!keyboard?.model) currentErrors.model = "Model is required.";
          if (!keyboard?.brand) currentErrors.brand = "Brand is required.";
          if (!keyboard?.serialNumber) currentErrors.serialNumber = "Serial Number is required";
          if (!keyboard?.purchaseDate) currentErrors.purchaseDate = "Purchase Date is required";
          if (!keyboard?.warrantyExpiryDate) currentErrors.warrantyExpiryDate = "Warranty Expiry Date is required";
        }
        break;
      case 2:
        if (formData?.deviceType === 'laptop'){
          if (!device2?.serialNumber) {
            currentErrors.serialNumber = "Serial Number is required";
          }
          if (!device2?.purchaseDate) currentErrors.purchaseDate = "Purchase Date is required";
          if (!device2?.warrantyExpiryDate) currentErrors.warrantyExpiryDate = "Warranty Expiry Date is required";
          // if (!device2.invoiceFile)
          //   currentErrors.invoiceFile = "Incoice File is required.";
        }
        else if (formData?.deviceType === 'mobile'){
          if (!m2?.serialNumber) {
            currentErrors.serialNumber = "Serial Number is required";
          }
          if (!m2?.purchaseDate) currentErrors.purchaseDate = "Purchase Date is required";
          if (!m2?.warrantyExpiryDate) currentErrors.warrantyExpiryDate = "Warranty Expiry Date is required";
          // if (!device2.invoiceFile)
          //   currentErrors.invoiceFile = "Incoice File is required.";
        }
        break;
      default:
        break;
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validate()) {
      
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevStep = () => {
    setStep((prevStep) => (prevStep >= 1 ? prevStep - 1 : prevStep));
  };

  const handleSubmit = async () => {
    if (validate()) {
      setIsLoading(true);
      try {
        const payload: any = createPayload(formData);
        
        // const deviceDetails: Device = {

          // {formData.deviceType === 'laptop' && {}}
          // device_type: formData.deviceType, //fixed
          // device_name: formData.laptopPage1.device_name,
          // os: formData.laptopPage1.os,
          // custom_model: formData.laptopPage1.model,
          // processor: formData.laptopPage1.processor,
          // ram: formData.laptopPage1.ram,
          // storage: formData.laptopPage1.storage,
          // serial_no: formData.advanceDeviceDetails.serialNumber,
          // device_purchase_date: formData.advanceDeviceDetails.purchaseDate,
          // purchase_order: formData.extraDetails.purchaseOrder,
          // warranty_expiary_date:
          //   formData.advanceDeviceDetails.warrantyExpiryDate,
          // brand: formData.extraDetails.brand,
          // image: formData.extraDetails.image,
          // userId: formData.extraDetails.assignedTo.value,
          // ownership: formData.extraDetails.ownership,
          // purchase_value: formData.extraDetails.purchaseValue,
          // asset_serial_no: "Asset serial no", // Consider making this dynamic if needed
          // addressId: formData.extraDetails.officeLocation.value,
        // };
    
        const response = await createDevices(payload);
        closeBtn(); // Close the sheet after successful submission
        router.refresh();
      } catch (error) {
        setIsLoading(false);
        // Optionally, handle the error and display a message to the user
      }
    }
  };

  return (
    <div className="flex flex-col justify-start items-start pt-2 px-3 space-y-4 gap-1 h-full">

      <div className="flex justify-start items-center gap-4 text-2xl font-semibold">
        <div className="bg-black rounded-full p-2 flex justify-center items-center">
          <Monitor color="white" className="size-5" />
        </div>
        <span>
          Add a {formData?.deviceType ? formData?.deviceType : "Device"}
        </span>
      </div>

      <div className="w-full flex flex-col gap-1">
        <div className="font-semibold text-lg text-black">
          Step {step} of {totalStep}
        </div>
        <div className="h-[1px] bg-[#E7E7E7] w-full"></div>
      </div>

      {/* Render different components based on the current step */}
      

      {step === 0 && (
        <DeviceType
          data={formData?.deviceType}
          setData={(data: string) =>
            setFormData((prev) => ({ ...prev, deviceType: data }))
          }
          error={errors?.deviceType}
          closeBtn={closeBtn}
          setTotalSteps={(steps: number) => {
            setTotalStep(steps);
          }}
        />
        // <AssignAssetsForm/>
      )}
      {step === 1 && formData?.deviceType === "keyboard" ? (
        <KeyboardForm
          data={formData?.keyboardDetails}
          setData={(data: Partial<KeyboardDetailsInterface>) =>
            updateFormData("keyboardDetails", data)
          }
          errors={errors}
        />
      ) : step === 1 && formData?.deviceType === "mouse" ? (
        <MouseForm
          data={formData?.mouseDetails}
          setData={(data: Partial<KeyboardDetailsInterface>) =>
            updateFormData("mouseDetails", data)
          }
          errors={errors}
        />
      ) : step === 1 && formData.deviceType === "laptop" ? (
        <LaptopForm
          data={formData?.laptopPage1}
          setData={(data: Partial<DevicePage1>) =>
            updateFormData("laptopPage1", data)
          }
          errors={errors}
          deviceType={formData?.deviceType}
        />
      ) : step === 1 && formData?.deviceType === "mobile" ? (
        <MobileForm
          data={formData?.mobilePage1}
          setData={(data: Partial<DevicePage1>) =>
            updateFormData("mobilePage1", data)
          }
          errors={errors}
          deviceType={formData?.deviceType}
        />
      ) : step === 1 && formData?.deviceType === "monitor" ? (
        <MonitorForm
          data={formData?.monitorDetails}
          setData={(data: Partial<KeyboardDetailsInterface>) =>
            updateFormData("monitorDetails", data)
          }
          errors={errors}
        />
      ): (
        <></>
      )}
      {step === 2 && formData?.deviceType === "laptop" ? (
        <LaptopForm2 
          data={formData?.laptopPage2}
          setData={(data: Partial<DevicePage2>) =>
            updateFormData("laptopPage2", data)
          }
          errors={errors}
        />
      ) : step === 2 && formData?.deviceType === "mobile" ? (
        <MobileForm2 
          data={formData.mobilePage2}
          setData={(data: Partial<DevicePage2>) =>
            updateFormData("mobilePage2", data)
          }
          errors={errors}
        />
      ): (
        <></>
      )}

      <div className="flex-grow"></div>    

      {/* Navigation buttons */}

      <div className="flex gap-3 w-full mt-auto">
        {step >= 1 ? (
          <button
            className="flex items-center justify-center gap-2 text-black py-2 px-5 rounded-[68.29px] font-semibold text-xl w-full transition duration-300 border border-black text-center"
            onClick={handlePrevStep}
            disabled={isLoading}
          >
            Back
          </button>
        ) : (
          <button
            className="flex items-center justify-center gap-2 text-black py-2 px-5 rounded-[68.29px] font-semibold text-xl w-full transition duration-300 border border-black text-center"
            onClick={() => {
              closeBtn();
            }}
            disabled={isLoading}
          >
            Cancel
          </button>
        )}
        {step < totalStep ? (
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-black text-white py-2 px-5 rounded-[68.29px] font-semibold text-xl w-full transition duration-300"
            onClick={handleNextStep}
            disabled={isLoading}
          >
            <div className="flex items-center gap-2">
              <span>Next</span>
              {isLoading ? <Spinner /> : <ChevronRight color="white" />}
            </div>
          </button>
        ) : (
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-black text-white py-2 px-5 rounded-[68.29px] font-semibold text-xl w-full transition duration-300"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <div className="flex items-center gap-2">
              <span>Submit</span>
              {isLoading ? <Spinner /> : <ChevronRight color="white" />}
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

export default Form;
