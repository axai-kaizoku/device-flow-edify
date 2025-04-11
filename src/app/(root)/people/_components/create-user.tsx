"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import { useEffect, useState } from "react";
import { UserForm } from "./user-form";
import { callAPIWithToken } from "@/server/helper";
import { UserResponse } from "@/server/userActions";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAlert } from "@/hooks/useAlert";

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
  const redirectUri = `http://localhost:3000/people`;

  useEffect(() => {
    const postGSuiteData = async () => {
      const clientId = sessionStorage.getItem("client_id");
      const clientSecret = sessionStorage.getItem("client_secret");

      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code: code as string,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          access_type: "offline",
          prompt: "consent",
          grant_type: "authorization_code",
        }),
      });

      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;

      if (accessToken) {
        const profileRes = await fetch(
          "https://admin.googleapis.com/admin/directory/v1/users?customer=my_customer&maxResults=10&orderBy=email",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const profile = await profileRes.json();
        const mappedUsers = profile?.users?.map((user) => {
          const primaryEmail =
            user.emails.find((email) => email?.primary)?.address || "";
          return {
            first_name: user?.name?.givenName || "Guest",
            last_name: user?.name?.familyName || "",
            email: primaryEmail || "",
            phone: user?.phones?.[0]?.value || "",
            role: 1,
            designation: "",
            employment_type: "",
            about: "",
            interests_and_hobbies: "",
            date_of_birth: "",
            image: "",
            qcUniqueId: "",
            gender: "",
            marital_status: "",
            physically_handicapped: "",
            deleted_at: null,
            onboarding_date: user.creationTime.split("T")[0],
          };
        });
        if (profileRes.status === 200) {
          const res = await callAPIWithToken<UserResponse>(
            "https://gcp-api.edify.club/edifybackend/v1/user/bulk-gsuite-upload",
            "POST",
            mappedUsers
          );
          showAlert({
            title: "Users Added!",
            description: ` Total ${profile?.users.length} Users Added`,
            isFailure: false,
            key: "Gsuite-users",
          });
          queryClient
            .refetchQueries({
              queryKey: ["fetch-people", "active-users"],
              exact: false,
            })
            .then();
          router.refresh();
        }

        return;
      }
    };

    if (code) {
      postGSuiteData();
    }
  }, [code]);

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
