import React, { useState } from "react";
import { FormField } from "../../settings/_components/form-field";
import { DemoPage1 } from "./DemoPage1";
import { DemoPage2 } from "./DemoPage2";

const DemoForm = ({setIsOpen}:{setIsOpen: ()=> boolean;}) => {
  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState({
    name: "",
    cmpname: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    cmpname: "",
    email: "",
  });

  const validateStep = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    const newErrors = {
      name: formData?.name ? "" : "Name is required",
      email: formData?.email
        ? emailRegex.test(formData?.email)
          ? ""
          : "Invalid email format"
        : "Email is required",
      phone: formData.phone
        ? phoneRegex.test(formData?.phone)
          ? ""
          : "Phone number must be 10 digits"
        : "Phone number is required",
    };

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));

    return !Object.values(newErrors).some((err) => err);
  };

  // Handle input changes
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // // First Step UI
  // const Step1 = () => (
  //   <div>
  //     <div className="text-[#090914] text-3xl font-gilroyBold">
  //       Schedule a Demo
  //     </div>

  //     <div className="flex flex-col gap-9 mt-9 mb-6">
  //       <FormField
  //         label="Name"
  //         id="name"
  //         name="name"
  //         type="text"
  //         value={formData?.name}
  //         onChange={handleChange}
  //         placeholder="Enter your name"
  //       />

  //       <FormField
  //         label="Company Name"
  //         id="cmpname"
  //         name="cmpname"
  //         type="text"
  //         value={formData?.cmpname}
  //         onChange={handleChange}
  //         placeholder="Enter your company"
  //       />

  //       <FormField
  //         label="Email"
  //         id="email"
  //         name="email"
  //         type="text"
  //         value={formData?.email}
  //         onChange={(e) => {
  //           const inputValue = e.target.value;
  //           const emailRegex =
  //             /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //           if (
  //             !inputValue ||
  //             /^[a-zA-Z0-9@._-]*$/.test(inputValue)
  //           ) {
  //             setFormData((prev) => ({
  //               ...prev,
  //               email: inputValue,
  //             }));

  //             // Validate email format on the fly
  //             setErrors((prevErrors) => ({
  //               ...prevErrors,
  //               email: inputValue
  //                 ? emailRegex.test(inputValue)
  //                   ? ""
  //                   : "Invalid email format"
  //                 : "Email is required",
  //             }));
  //           }
  //         }}
  //         maxLength={50}
  //         placeholder="Enter your email"
  //       />

  //       <FormField
  //         label="Phone"
  //         id="phone"
  //         name="phone"
  //         type="tel"
  //         value={formData?.phone}
  //         onChange={(e) => {
  //           const inputValue = e.target.value;
  //           const phoneRegex = /^[0-9]{0,10}$/;

  //           // Allow only numbers (or empty string) and prevent invalid input
  //           if (!inputValue || phoneRegex.test(inputValue)) {
  //             setFormData((prev) => ({
  //               ...prev,
  //               phone: inputValue,
  //             }));

  //             // Validate phone number format on the fly
  //             setErrors((prevErrors) => ({
  //               ...prevErrors,
  //               phone: inputValue
  //                 ? /^[0-9]{10}$/.test(inputValue)
  //                   ? ""
  //                   : "Phone number must be 10 digits"
  //                 : "Phone number is required",
  //             }));
  //           }
  //         }}
  //         maxLength={10}
  //         placeholder="Enter your contact"
  //       />
  //     </div>

  //     <div
  //       className="rounded-[9px] bg-black text-white text-base font-gilroySemiBold py-3 cursor-pointer"
  //       onClick={() => setStep(2)} // Move to step 2
  //     >
  //       Request demo
  //     </div>
  //   </div>
  // );

  // // Second Step UI
  // const Step2 = () => (
  //   <div className="py-10">
  //     <div className="flex flex-col gap-4 mb-8">
  //       <div className="text-[#090914] text-3xl font-gilroyBold">All Done!</div>
        
  //       <div className="text-[#52525B] text-base font-gilroyMedium">Sit Back! Our support will contact you soon</div>
  //     </div>

  //     <div
  //       className="rounded-[9px] bg-black text-white text-base font-gilroySemiBold py-3 cursor-pointer"
  //       onClick={() => setStep(2)} // Move to step 2
  //     >
  //       Done
  //     </div>
  //   </div>
  // );


  return (
    <div>
      {step === 1 ? (
        <DemoPage1
          formData={formData}
          errors={errors}
          setErrors={setErrors}
          handleChange={handleChange}
          setStep={setStep}
          validateStep = {validateStep}
        />
      ) : (
        <DemoPage2 setStep={setStep} setIsOpen={setIsOpen}/>
      )}
    </div>
  );
};

export default DemoForm;
