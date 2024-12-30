"use client";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert, openAlert } from "@/app/store/alertSlice";

const useAlert = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.alert.isOpen);

  const showAlert = () => {
    dispatch(openAlert());
  };

  const hideAlert = () => {
    dispatch(closeAlert());
  };

  return { isOpen, showAlert, hideAlert };
};

export default useAlert;
