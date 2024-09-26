export const hasErrors = (error: any) => {
  return Object.entries(error)?.length > 0;
};

export const handleErrorObject = (key: any, isValid: any, error: any) => {
  let errorObj = { ...error };
  if (!isValid) {
    errorObj = { ...errorObj, [key]: !isValid };
  } else if (errorObj?.hasOwnProperty(key)) {
    delete errorObj[key];
  }
  return errorObj;
};

export const isEmpty = (value: any) => {
  return !value && value !== 0 ? true : false;
};

export const removeHtmlTags = (value: any) => {
  if (value === null || value === '') return false;
  else value = value.toString();
  return value.replace(/(<([^>]+)>)/gi, '');
};

export const testRegex = (regex: any, value: any) => {
  return !regex.test(value);
};


