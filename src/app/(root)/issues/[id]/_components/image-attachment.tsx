import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Attachment } from "./chat-interface";
import { formatFileSize } from "@/lib/utils";

interface ImageAttachmentProps {
  attachment: string | Attachment;
  preview?: boolean;
}

export function ImageAttachment({
  attachment,
  preview = false,
}: ImageAttachmentProps) {
  // Normalize props
  const url = typeof attachment === "string" ? attachment : attachment.url!;
  const name =
    typeof attachment === "string"
      ? url.split("/").pop()!
      : attachment.name || url.split("/").pop()!;
  const size =
    typeof attachment === "object" && attachment.size
      ? formatFileSize(attachment.size)
      : undefined;

  return (
    <div
      className={`flex items-center border rounded-md overflow-hidden ${
        preview ? "w-40" : "w-full max-w-[12rem]"
      }`}
    >
      {/* <img
        src={url}
        alt={name}
        width={preview ? 80 : 80}
        height={preview ? 80 : 80}
        className="w-full h-full object-cover"
      />

      {!preview && (
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button variant="ghost" size="xs" className="text-white">
            <a
              href={url}
              download={name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="size-3" />
            </a>
          </Button>
        </div>
      )} */}
      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 bg-white text-gray-500">
        <div className="p-1 rounded-md">
          <img
            src={url}
            alt={name}
            width={36}
            height={36}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
      <div className="flex-1 min-w-0 px-2 py-2">
        <p className="text-xs font-gilroyMedium truncate text-[#333]">{name}</p>
        {preview && size && <p className="text-xs text-gray-500">{size}</p>}
      </div>
      {!preview && (
        <Button variant="ghost" size="icon" className="flex-shrink-0 ">
          <a
            href={url}
            download={name}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="h-4 w-4" />
          </a>
        </Button>
      )}
    </div>
  );
}
