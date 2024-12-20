import { Icon } from "@/components/wind/Icons";
import React, { useEffect, useState } from "react";

import { createDevices, Device } from "@/server/deviceActions";
import { SignalHigh, SignalLow, SignalMedium } from "lucide-react";
import { Input, Textarea } from "@/components/wind/Input";
import { createIssue } from "@/server/issueActions";
import { useRouter } from "next/navigation";

interface FormProps {
  device: Device;
  closeBtn: (value: boolean) => void;
}

function Form({ device, closeBtn }: FormProps) {
  const router = useRouter();
  // console.log(session);

  const [formData, setFormData] = useState({
    deviceId: device._id,
    serial_no: device?.serial_no,
    priority: "",
    status: "Open",
    title: "",
    description: "",
  });

  const severityArray = ["Low", "Medium", "Critical"];

  const changeHandler = (name: string, sev: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: sev,
    }));
  };

  async function handleSubmit() {
    try {
      const createdIssue = await createIssue(formData);
      console.log("Issue created successfully:", createdIssue);
    } catch (error) {
      console.error("Error creating issue:", error);
    }

    router.refresh();
    closeBtn(false);
  }

  return (
    <div className="flex flex-col justify-center items-start pt-12 px-4 space-y-6">
      <div className="flex justify-start items-center gap-2 text-xl font-gilroySemiBold">
        <Icon type="OutlinedWarning" color="black" />
        <span>Reporting an Issue</span>
      </div>

      <div className="w-full flex flex-wrap justify-start items-center gap-7 bg-gray-200 py-3 px-4 rounded-lg shadow-sm">
        <div>
          <img
            src={
              device.image ||
              "https://th.bing.com/th/id/R.d589fbf35245e2db2929bb113c0b1547?rik=fhPXY3J%2ff4BmSw&riu=http%3a%2f%2fwww.tracyandmatt.co.uk%2fwp%2fwp-content%2fuploads%2f2013%2f11%2fcomputer-laptop.png&ehk=GBtBE3fo5fsbw6lTC9D4mX%2fXwJRRolFdXxhiHPufbSg%3d&risl=&pid=ImgRaw&r=0"
            }
            alt="Device Name"
            width={80}
            height={80}
          />
        </div>

        <div>
          <div className="model_number font-gilroyBold text-xl">
            {device.device_name}
          </div>
          <div className="serial_number text-gray-500">{device.serial_no}</div>
        </div>
      </div>

      <div className="w-full">
        <h1 className="my-4 font-gilroyBold">Give the Title of the Issue</h1>
        <Input
          name="title"
          value={formData.title}
          placeholder="Big Issue in..."
          style={{ width: "100%", fontSize: "1.125rem" }}
          onChange={(event) => {
            changeHandler(event.target.name, event.target.value);
          }}
        />
      </div>

      <div className="w-full">
        <h1 className="my-4 font-gilroyBold">
          Select the Severity of the Issue
        </h1>

        <div className="flex flex-col gap-6 w-full mb-4">
          {severityArray.map((sev) => (
            <div
              // className={`flex items-center border rounded-lg px-2 py-4 text-lg cursor-pointer w-full ${
              //     formData.priority === sev
              //         ? 'border-black'
              //         : 'border-gray-300'
              // }`}
              className={`border-2 border-black w-full flex items-center px-2 py-4 text-lg cursor-pointer rounded-lg ${
                formData.priority === sev
                  ? "border-black bg-gray-50"
                  : "border-gray-300"
              }`}
              onClick={() => changeHandler("priority", sev)}
            >
              <input
                type="radio"
                name="priority"
                id={sev}
                onChange={(event) => changeHandler(event?.target.name, sev)}
                className="mr-4 h-10 w-4 accent-black"
                checked={formData.priority === sev}
              />
              <label
                htmlFor={sev}
                className={`cursor-pointer ${
                  formData.priority === sev ? "text-black" : "text-gray-600"
                } flex gap-4 justify-center items-center `}
              >
                <span>
                  {sev === "Low" ? (
                    <SignalLow />
                  ) : sev === "Medium" ? (
                    <SignalMedium />
                  ) : (
                    <SignalHigh />
                  )}
                </span>
                <span>{sev}</span>
              </label>
            </div>
          ))}
        </div>

        <div>
          <h1 className="my-4 font-gilroyBold">
            Describe the issue you're facing with your device
          </h1>
          <Textarea
            name="description"
            value={formData.description}
            onChange={(event) => {
              changeHandler(event.target.name, event.target.value);
            }}
            width="100%"
            style={{ outline: "none", borderRadius: "0.5rem" }}
            placeholder="So recently, I've been running into an issue with the device..."
          />
        </div>

        <div className="flex items-center justify-end gap-6 my-3">
          <button
            className="flex items-center justify-center gap-2 bg-white text-black py-3 px-4 border-2 border-gray-200 rounded-md transition duration-300"
            onClick={() => {
              closeBtn(false);
            }}
          >
            Cancel
          </button>

          <button
            className="flex items-center justify-center gap-2  bg-black text-white py-3 px-4 rounded-md transition duration-300 hover:bg-gray-800"
            onClick={handleSubmit}
          >
            Report Issue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
