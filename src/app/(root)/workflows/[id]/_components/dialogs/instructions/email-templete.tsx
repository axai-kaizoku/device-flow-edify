import { Button } from "@/components/buttons/Button";
import { Delete01Icon, PencilEdit01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useDeleteNode } from "../../hooks/use-delete-node";
import { toast } from "sonner";
import { ConfirmationModal } from "../../dropdowns/confirmation-popup";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateAppActions } from "../../hooks/use-update-app-actions";

export const EmailTemplate = ({
  setIsEdit,
  defaultService,
  currentNodeData,
  currentService,
}: {
  setIsEdit: (val: boolean) => void;
  currentNodeData: any;
  defaultService: any;
  currentService: any;
}) => {
  const queryClient = useQueryClient();
  const selectedService = JSON.parse(currentService) ?? {};
  const {
    config: { cc, subject, html },
    _id,
  } = selectedService;
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { deleteNodeMutation } = useDeleteNode();
  const { updateAppActionsMutation } = useUpdateAppActions(
    currentNodeData?.workflowId
  );

  // Extract attachment details
  let fileName: string | null = null;
  let attachmentUrl: string | null = null;
  let bodyContent = html || "";

  if (html) {
    const attachmentRegex = /<a\s+href="([^"]+)"[^>]*>.*<\/a>/i;
    const match = html.match(attachmentRegex);

    if (match) {
      attachmentUrl = match[1];
      const rawFileName = decodeURIComponent(
        attachmentUrl.split("/").pop() || ""
      );
      fileName = rawFileName.replace(/^\d+-/, ""); // remove leading numbers

      // Remove attachment block & hr from the body HTML
      bodyContent = html
        .replace(attachmentRegex, "")
        .replace(/<hr[^>]*>/i, "")
        .trim();
    }
  }

  return (
    <div>
      <div className="bg-[#F9F9F9] rounded p-4 flex flex-col gap-3 text-[13px] font-gilroyMedium">
        <div className="flex items-end justify-start gap-2">
          <span className="text-[#A5A5A5]">To:</span>
          <div>{"{Employee email}"}</div>
        </div>

        <div className="flex items-end justify-start gap-2">
          <span className="text-[#A5A5A5]">From:</span>
          <div>contact@deviceflow.ai</div>
        </div>

        <div className="flex items-end justify-start gap-2">
          <span className="text-[#A5A5A5]">CC:</span>
          <div>{Array.isArray(cc) ? cc.join(", ") : "N/A"}</div>
        </div>

        <div className="flex items-end justify-start gap-2">
          <span className="text-[#A5A5A5]">Subject:</span>
          <div>{subject || "N/A"}</div>
        </div>

        <div className="flex items-start justify-start gap-2">
          <span className="text-[#A5A5A5]">Body:</span>
          <div
            className="flex-1 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: bodyContent || "<p>No body content provided.</p>",
            }}
          />
        </div>

        {fileName && attachmentUrl && (
          <div className="flex items-end justify-start gap-2">
            <span className="text-[#A5A5A5]">Attachment:</span>
            <a
              href={attachmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0062FF] break-all hover:underline"
            >
              <div>{fileName}</div>
            </a>
          </div>
        )}
      </div>
      {/* <pre>{JSON.stringify(defaultService)}</pre> */}
      {/* <pre>{JSON.stringify(isConfigChanged)}</pre> */}
      {/* <pre>{JSON.stringify(currentConfig)}</pre> */}

      <div className="flex mt-3 gap-3 mb-5">
        <ConfirmationModal
          open={confirmDelete}
          setOpen={setConfirmDelete}
          functionToBeExecuted={async () => {
            if (selectedService.custom) {
              await updateAppActionsMutation.mutateAsync({
                nodeId: currentNodeData?._id,
                templateKey: defaultService?.key,
                workflowId: currentNodeData?.workflowId,
                config: defaultService.config,
                customTempleteKey: JSON.stringify(defaultService),
              });

              await deleteNodeMutation.mutateAsync(_id, {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: [
                      "get-node-services",
                      currentNodeData?.template?.name,
                    ],
                  });
                  setConfirmDelete(false);
                },
              });
            } else {
              toast.error("Cannot delete default template !");
            }
          }}
          title="Are you sure?"
          description="Are you sure you want to delete the template?"
          type="failure"
          successBtnText="Delete"
        >
          <Button
            className="text-[#FF0000] w-full flex-1"
            type="button"
            variant="outlineTwo"
            onClick={(e) => e.stopPropagation()}
          >
            <HugeiconsIcon icon={Delete01Icon} size={16} />
            Delete
          </Button>
        </ConfirmationModal>
        <Button
          className="text-[#0062FF] w-full flex-1"
          type="button"
          variant="outlineTwo"
          onClick={(e) => {
            e.stopPropagation();
            if (!selectedService.custom) {
              toast.error("Cannot edit default template !");
            } else {
              setIsEdit(true);
            }
          }}
        >
          <HugeiconsIcon
            icon={PencilEdit01Icon}
            className="text-black"
            size={18}
          />
          Edit
        </Button>
      </div>
    </div>
  );
};
