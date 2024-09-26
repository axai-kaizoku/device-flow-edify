import React, { useEffect } from "react";
import { FormWrap } from "./styles/style";

export const Form = ({
  children,
  onFormSubmit,
  prefill,
  style,
  width,
  formId,
}: FormProps) => {
  useEffect(() => {
    if (prefill) patchFormValues();
  }, []);

  const patchFormValues = () => {
    let form: any = document.querySelector(`#${formId}`);
    let inputs = form.elements;
    for (let i = inputs.length - 1; i >= 0; i--) {
      let elementName = inputs[i].getAttribute("name");
      if (prefill.hasOwnProperty(elementName)) {
        inputs[i].value = prefill[elementName];
      }
    }
  };

  const touchFormElements = () => {
    let form: any = document.querySelector(`#${formId}`);
    let inputs = form.elements;
    for (let i = inputs.length - 1; i >= 0; i--) {
      let elementId = inputs[i].getAttribute("id");
      setTimeout(() => {
        document.getElementById(elementId)?.focus();
      }, 100);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    touchFormElements();
    if (e.target.checkValidity()) {
      let formElement: any = document.getElementById(formId);
      let formData = new FormData(formElement);
      let obj = {};
      for (const [key, value] of formData.entries()) {
        if (formData.getAll(key).length > 1) {
          obj[key] = formData.getAll(key);
        } else {
          obj[key] = formData.getAll(key)?.[0];
        }
      }
      onFormSubmit(obj);
    }
  };

  return (
    <FormWrap
      id={formId}
      style={{ width: width, ...style }}
      onSubmit={(e) => handleFormSubmit(e)}
      autoComplete="off"
      noValidate
    >
      {children}
    </FormWrap>
  );
};

interface PrefillData {
  [key: string]: any;
}

export type Layout = "horizontal" | "vertical" | "inline";

export interface FormProps {
  // The content of the Form.
  children: React.ReactElement | React.ReactElement[];
  // form submit handler which is only triggered if form is valid
  onFormSubmit: (formData) => void;
  // to patch form values
  prefill?: PrefillData;
  // width of the form
  width?: number | string | undefined;
  // Specifies style of form
  style?: React.CSSProperties;
  // form id
  formId: string;
}
