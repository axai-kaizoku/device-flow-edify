// import { Download } from "lucide-react";
// import { formatFileSize } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Attachment } from "./chat-interface";

// interface FileAttachmentProps {
//   attachment: string | Attachment;
//   preview?: boolean;
// }

// export function FileAttachment({
//   attachment,
//   preview = false,
// }: FileAttachmentProps) {
//   return (
//     <div
//       className={`flex items-center border rounded-md overflow-hidden ${
//         preview ? "w-40" : "w-full max-w-xs"
//       }`}
//     >
//       <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 bg-gray-100 text-gray-500">
//         📄
//       </div>
//       <div className="flex-1 min-w-0 px-3 py-2">
//         <p className="text-sm font-medium truncate">
//           {/* {attachment} */}
//           File
//         </p>
//       </div>
//       {!preview && (
//         <Button variant="ghost" size="icon" className="flex-shrink-0 mr-1">
//           <a
//             href={attachment}
//             download={attachment}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Download className="h-4 w-4" />
//           </a>
//         </Button>
//       )}
//     </div>
//   );
// }

// FileAttachment.tsx
import { Download } from "lucide-react";
import { formatFileSize } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Attachment } from "./chat-interface";

interface FileAttachmentProps {
  attachment: string | Attachment;
  preview?: boolean;
}

export function FileAttachment({
  attachment,
  preview = false,
}: FileAttachmentProps) {
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
        preview ? "w-40" : "w-full max-w-xs"
      }`}
    >
      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 bg-gray-100 text-gray-500">
        📄
      </div>
      <div className="flex-1 min-w-0 px-3 py-2">
        <p className="text-sm font-medium truncate">{name}</p>
        {preview && size && <p className="text-xs text-gray-500">{size}</p>}
      </div>
      {!preview && (
        <Button variant="ghost" size="icon" className="flex-shrink-0 mr-1">
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
