import { Button } from "@/components/buttons/Button";
import { Input } from "@/components/ui/input";
import { Delete01Icon, PencilEdit01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const EmailTemplate = ({
  setIsEdit,
  currentConfig,
}: {
  setIsEdit: (val: boolean) => void;
  currentConfig: any;
}) => {
  const configData = currentConfig?.configData || {};
  const { to, cc, subject, html } = configData;

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
          <div>{Array.isArray(to) ? to.join(", ") : "{Employee email}"}</div>
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

      <div className="flex mt-3 gap-3">
        <Button
          className="text-[#FF0000] w-full flex-1"
          type="button"
          variant="outlineTwo"
          onClick={(e) => e.stopPropagation()}
        >
          <HugeiconsIcon icon={Delete01Icon} size={16} />
          Delete
        </Button>
        <Button
          className="text-[#0062FF] w-full flex-1"
          type="button"
          variant="outlineTwo"
          onClick={(e) => {
            e.stopPropagation();
            setIsEdit(true);
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
