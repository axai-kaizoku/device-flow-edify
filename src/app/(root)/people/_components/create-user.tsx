"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import { useEffect, useState } from "react";
import { UserForm } from "./user-form";
import { callAPIWithToken, getTokenFromSession } from "@/server/helper";
import { UserResponse } from "@/server/userActions";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAlert } from "@/hooks/useAlert";
import axios from "axios";

export default function CreateUser({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();
  const [openGsuiteModal, setOpenGsuiteModal] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const code = useSearchParams().get("code");
  const [formDataGsuite, setFormDataGsuite] = useState<{
    [key: string]: string;
  }>({
    client_id: "",
    client_secret: "",
  });
  const [errorsGsuite, setErrorsGsuite] = useState<{ [key: string]: string }>(
    {}
  );
  const redirectUri = `https://deviceflow.ai/people`;

  const onGSuitSubmit = async () => {
    const clientId = formDataGsuite.client_id;
    const clientSecret = formDataGsuite.client_secret;

    if (!code) {
      const scope =
        "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/admin.directory.user.readonly";
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(
        scope
      )}&access_type=offline&prompt=consent`;

      // Store credentials in sessionStorage (or secure state handling)
      sessionStorage.setItem("client_id", clientId);
      sessionStorage.setItem("client_secret", clientSecret);

      window.location.href = authUrl;
      return;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataGsuite((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center gap-8">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent>
          <UserForm
            closeBtn={setOpen}
            buttonLoading={buttonLoading}
            setOpenGsuiteModal={setOpenGsuiteModal}
            openGsuiteModal={openGsuiteModal}
            errorsGsuite={errorsGsuite}
            onGSuitSubmit={onGSuitSubmit}
            formDataGsuite={formDataGsuite}
            handleChange={handleChange}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
