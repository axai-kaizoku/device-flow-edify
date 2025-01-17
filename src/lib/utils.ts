//    ///*@asdfasdts-ignore

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment-timezone";
// import { PREFIX, SEGMENT_API_KEY } from './config';
// import { getOrgDetails } from './api/CommonApi';
// import H from 'history';
// import { Role } from '../components/Constants';

const Role = {
  admin: {},
  student: {},
  faculty: {},
};
const PREFIX = "";
const SEGMENT_API_KEY = "asdfasdfsadfsafasdfasfdsfdsafsdfsdf";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//@ts-ignore
export function abbreviateNumber(
  number: any,
  decimals?: any,
  recursiveCall?: any
) {
  if (!number) return 0;

  const decimalPoints = decimals || 2;
  const noOfLakhs = number / 100000;
  const noOfTh = number / 1000;
  let displayStr;
  let isPlural;
  // Rounds off digits to decimalPoints decimal places
  function roundOf(integer: any) {
    return integer.toLocaleString(undefined, {
      minimumFractionDigits: decimalPoints,
      maximumFractionDigits: decimalPoints,
    });
  }

  if (noOfTh >= 1 && noOfTh < 100) {
    const th = roundOf(noOfTh);
    isPlural = th > 1 && !recursiveCall;
    return (displayStr = `${th} K`);
  }
  if (noOfLakhs >= 1 && noOfLakhs < 100) {
    const lakhs = roundOf(noOfLakhs);
    isPlural = lakhs > 1 && !recursiveCall;
    displayStr = `${lakhs} L`;
  } else if (noOfLakhs >= 100) {
    const crores = roundOf(noOfLakhs / 100);
    const crorePrefix: any =
      crores >= 100000 ? abbreviateNumber(crores, 2, true) : crores;
    isPlural = crores > 1 && !recursiveCall;
    displayStr = `${crorePrefix} Cr`;
  } else {
    displayStr = roundOf(+number);
  }

  return displayStr;
}

export function isEllipsis(name: any) {
  if (!name) return false;
  if (name.length < 66) {
    return true;
  } else {
    return false;
  }
}

export const ellipsisFunction = (str: any, alphabets: number) => {
  return str.length > alphabets ? `${str.substring(0, alphabets + 1)}...` : str;
};

export const restrictNumber = (value: any) => {
  return value?.replace(/[^0-9\.]/g, "");
};

export const allowWholeNumbers = (value: any) => {
  return value?.replace(/[^0-9]/g, "");
};

export const allowZeroAndNegative = (value: any) => {
  return value?.replace(/[-][0-9]|[0]/g, "");
};

export const allowPositiveNegativeFloat = (value: any) => {
  return value?.replace(/^[-+]?[0-9]*\.?[0-9]+$/, "");
};

export const restrictAlphabets = (value: any) => {
  return value?.replace(/[0-9]/g, "");
};

export function formatDateTime(
  startDate?: string,
  startTime?: string,
  endDate?: string,
  endTime?: string
) {
  const start_time = moment(`${startDate} ${startTime}`);
  const end_time = moment(`${endDate} ${endTime}`);
  return {
    startTime: `${moment.utc(start_time).format("YYYY-MM-DD")}T${moment
      .utc(start_time)
      .format("HH:mm:ss")}Z`,
    endTime: `${moment.utc(end_time).format("YYYY-MM-DD")}T${moment
      .utc(end_time)
      .format("HH:mm:ss")}Z`,
  };
}

export function formatDateTimeWithoutTimeZone(
  startDate?: string,
  startTime?: string,
  endDate?: string,
  endTime?: string
) {
  const start_time = moment(`${startDate} ${startTime}`);
  const end_time = moment(`${endDate} ${endTime}`);
  return {
    startTime: `${moment.utc(start_time).format("YYYY-MM-DD")}T${moment
      .utc(start_time)
      .format("HH:mm:ss")}`,
    endTime: `${moment.utc(end_time).format("YYYY-MM-DD")}T${moment
      .utc(end_time)
      .format("HH:mm:ss")}`,
  };
}

export function fixUptoTwoDecimals(number: any) {
  if (number) {
    if (number % 1 === 0) {
      return number;
    } else {
      return Number(Number(number).toFixed(2));
    }
  } else return "";
}

export const isNumeric = (value: any): boolean =>
  !isNaN(parseFloat(value)) && isFinite(value);

export const toLocalTime = (value: any) => {
  if (!value) return null;
  const tz = moment.tz.guess();
  const stillUtc = moment.utc(value).toDate();
  return moment.tz(stillUtc, tz).format("LLL");
};

export const getCurrentCountry = () => {
  const tz = moment.tz.guess();
  return tz === "Asia/Calcutta" ? "in" : "us";
};

// export function trackPageAnalytics(name: string, path: string) {
// 	let organisation: any = null;
// 	if (localStorage.getItem('organisation')) {
// 		organisation = JSON.parse(localStorage.organisation);
// 	}
// 	let user: any = null;
// 	if (localStorage.getItem('user')) {
// 		user = JSON.parse(localStorage.user);
// 	}
// 	let userId = 'No user id';
// 	if (user?._id) {
// 		userId = `${user?._id}:${organisation?._id}`;
// 	}
// 	segementAnalytics.page({
// 		userId,
// 		name: `(Web) ${name}`,
// 		properties: {
// 			url: path,
// 			referrer: `${window.origin}`,
// 			orgId: organisation?._id,
// 			userName: user?.name,
// 			userPhone: user?.phone,
// 			userCountryCode: user?.countryCode,
// 		},
// 	});
// }

// export function trackEvents(event: string, packageId?: string, payload?: any) {
// 	const date = moment().format('LLL');
// 	let isMobile = false;
// 	let isWeb = true;
// 	const mql = window.matchMedia('screen and (max-width: 600px)');
// 	if (mql.matches) {
// 		isMobile = true;
// 		isWeb = false;
// 	}
// 	let organisation: any = null;
// 	if (localStorage.getItem('organisation')) {
// 		organisation = JSON.parse(localStorage.organisation);
// 	}
// 	let user: any = null;
// 	if (localStorage.getItem('user')) {
// 		user = JSON.parse(localStorage.user);
// 	}
// 	let userId = 'No user id';
// 	if (user?._id) {
// 		userId = `${user?._id}:${organisation?._id}`;
// 	}
// 	return segementAnalytics.track({
// 		userId,
// 		event: `(Web) ${event}`,
// 		properties: {
// 			orgId: organisation?._id,
// 			userName: user?.name,
// 			userPhone: user?.phone,
// 			userCountryCode: user?.countryCode,
// 			path: window?.location?.pathname,
// 			packageId,
// 			web: isWeb,
// 			m_web: isMobile,
// 			platform_type: isWeb ? 'web' : 'web_app',
// 			date_time: date,
// 			...payload,
// 		},
// 	});
// }

export function getTimeDifference() {
  setInterval(() => {
    var countDownDate = new Date("Dec 31, 2021 23:59:59").getTime(); // date from want to get a difference
    var now = new Date().getTime();
    var timeleft = countDownDate - now;
    if (timeleft) {
      //return or set the values here
    }
  }, 1000);
}

// export const isNotInternalOrg = () => {
// 	return (
// 		PREFIX !== 'demo' &&
// 		PREFIX !== 'winuall-admin' &&
// 		PREFIX !== 'winuallcoaching' &&
// 		PREFIX !== 'onlinestore' &&
// 		PREFIX !== 'marketplace'
// 	);
// };

export const camelCaseToSentenceCase = (value: string) => {
  const result = value.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const snakeCaseToSentenceCase = (value: string) => {
  return value.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
    c ? c.toUpperCase() : " " + d.toUpperCase()
  );
};

export const getDiscountPercentage = (mrp: number, sellingPrice: number) => {
  let discount = ((mrp - sellingPrice) / mrp) * 100;
  discount = Math.round(discount);
  return discount;
};

export const getHalfDownRating = (rating: number) => {
  return rating ? Math.round(2 * rating - 0.5) / 2 : 0;
};

export const getSuffixByCount = (count: any, suffix: any) => {
  return count > 1 ? suffix : "";
};
export const getCurrentTimeStamp = () => {
  return moment().valueOf();
};

export const convertTime = (sec: any) => {
  if (sec) {
    let hours: string | number;
    let min;
    hours = Math.floor(sec / 3600);
    hours >= 1 ? (sec = sec - hours * 3600) : (hours = "00");
    min = Math.floor(sec / 60);
    min >= 1 ? (sec = sec - min * 60) : (min = "00");
    sec < 1 ? (sec = "00") : void 0;

    min.toString().length === 1 ? (min = "0" + min) : void 0;
    sec.toString().length === 1 ? (sec = "0" + sec) : void 0;

    return (
      ((hours as number) > 0 ? hours + " " + "hr" : "") +
      " " +
      min +
      " " +
      " min" +
      " " +
      sec +
      " " +
      "sec"
    );
  }
};

export const formattedTime = (date: any) => {
  if (moment(date).fromNow().includes("minutes")) {
    const Minutes = moment(date).fromNow().split(" ");
    return Minutes[0] + " minute";
  }
  if (moment(date).fromNow().includes("an hour ago")) {
    const Hour = moment(date).fromNow().split(" ");
    return Hour[0] + " hour";
  }
  if (moment(date).fromNow().includes("a few seconds ago")) {
    const Second = moment(date).fromNow().split(" ");
    return Second[0] + " second";
  }
  if (moment(date).fromNow().includes("day")) {
    const Day = moment(date).fromNow().split(" ");
    return Day[0] + " day";
  }
  if (moment(date).fromNow().includes("hours")) {
    const Hour = moment(date).fromNow().split(" ");
    return Hour[0] + " hour";
  }
  if (moment(date).fromNow().includes("months")) {
    const Month = moment(date).fromNow().split(" ");
    return Month[0] + " month";
  }
  if (moment(date).fromNow().includes("a month ago")) {
    const Month = moment(date).fromNow().split(" ");
    return Month[0] + " month";
  }
};

export const formatDateWithNoSpace = (time: any) => {
  const date = moment().format("YYYY-DD-MM");
  const currTime = moment(time, "HH:mm").format("HH:mm:ss");
  const newDate = formatDateTime(date, currTime);
  const formatedDate = newDate.startTime.replace(/:|-/g, "");
  return formatedDate;
};

export const convertBytes = (bytes: number) => {
  let units = ["b", "Kb", "Mb", "Gb", "Tb", "Pb"];
  let i = 0;
  for (i; bytes > 1024; i++) {
    bytes /= 1024;
  }
  return bytes.toFixed(1) + " " + units[i];
};

export const isStudentLoggedIn = () => {
  const token: any = localStorage.getItem("token");
  const role = Number(localStorage.getItem("role"));
  return role === 1 && token?.length >= 5;
};

export const getStudentDetails = () => {
  const userDetails = JSON.parse(
    isStudentLoggedIn() ? localStorage.getItem("user") || "{}" : "{}"
  );
  return userDetails;
};

export const fetchYoutubeDetails = (data: any) => {
  return fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails%2C+snippet&id=${data}&key=AIzaSyBqwzJSzlazJqy0VtIEj6xTx2BGBmO9Pk8`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((res) => {
      return res;
    });
};
export const getPriceRange = (price: any) => {
  return price > 0 && price <= 100
    ? "0-100"
    : price > 100 && price <= 500
    ? "100-500"
    : price > 500 && price <= 1000
    ? "500-1000"
    : "1000+";
};

export const getPriceType = (price: any) => {
  return price === 0 ? "Free" : "Paid";
};

export const getStoreTrackEventPayload = (product: any) => {
  let payload: any = {
    category_type: product.type,
    package_id: product?._id,
    price_type: getPriceType(product.payable_cost),
  };
  if (product.payable_cost > 0) {
    payload.price_range = getPriceRange(product.payable_cost);
  }
  return payload;
};

export const getUserRole = (roles: any, orgId: any) => {
  let role, isSelfRegistered;
  roles?.forEach((res: any) => {
    if (orgId === res.orgId) {
      role = res?.role;
      isSelfRegistered = res?.isSelfRegistered;
    }
  });
  return {
    role,
    isSelfRegistered,
  };
};

export const razorPayScript = () => {
  const rpExists = document.getElementById("razorpay-script");
  if (rpExists != null) return;
  const script = document.createElement("script");
  script.id = "razorpay-script";
  script.src = "https://checkout.razorpay.com/v1/checkout.js"; // whatever url you want here
  document.head.appendChild(script);
};

export const easeBuzzScript = () => {
  const eBExists = document.getElementById("easebuzz-script");
  if (eBExists != null) return;
  const script = document.createElement("script");
  script.id = "easebuzz-script";
  script.src =
    "https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/easebuzz-checkout.js";
  document.head.appendChild(script);
};

export const isPluginInstalled = (uniqueIdenifier: string) => {
  const orgDetails = JSON.parse(localStorage.getItem("organisation") || "{}");
  return (
    orgDetails?.extras?.installedPlugins &&
    orgDetails?.extras?.installedPlugins?.findIndex(
      (res: any) => res?.uniqueIdentifier === uniqueIdenifier
    ) !== -1
  );
};

//Fetch Specific Plugin details
export const pluginDetails = (uniqueIdenifier: string) => {
  const orgDetails = JSON.parse(localStorage.getItem("organisation") || "{}");
  let filteredValue = orgDetails?.extras?.installedPlugins?.filter((v: any) => {
    return v?.uniqueIdentifier === uniqueIdenifier;
  });
  return filteredValue?.[0];
};

export const userTypeFunc = () => {
  const role = localStorage.getItem("role");
  switch (role) {
    case Role.admin:
      return "admin";
    case Role.student:
      return "student";
    case Role.faculty:
      return "faculty";
    default:
      return "";
  }
};

export const isStudent = () => {
  const role = localStorage.getItem("role");
  return role === Role.student;
};

export const isFaculty = () => {
  const role = localStorage.getItem("role");
  return role === Role.faculty;
};

export const isAdmin = () => {
  const role = localStorage.getItem("role");
  return role === Role.admin;
};

export const notificationType = (userType: string) => {
  if (userType === "admin") {
    return "isAdmin";
  } else if (userType === "student") {
    return "isStudent";
  } else if (userType === "faculty") {
    return "isFaculty";
  }
  return;
};

export const isEdify = () => {
  const hostname = window.location.hostname;
  const subDomain = hostname.split(/[- , .]/);
  if (
    subDomain?.[1] === "paathshala" &&
    subDomain?.[2] &&
    subDomain?.[2].toString().length === 4
  ) {
    return true;
  } else {
    return false;
  }
};
