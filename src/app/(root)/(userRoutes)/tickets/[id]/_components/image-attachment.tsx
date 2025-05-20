// import { Button } from "@/components/ui/button";
// import { Download } from "lucide-react";
// import { Attachment } from "./chat-interface";

// interface ImageAttachmentProps {
//   attachment: string | Attachment;
//   preview?: boolean;
// }

// export function ImageAttachment({
//   attachment,
//   preview = false,
// }: ImageAttachmentProps) {
//   return (
//     <div
//       className={`relative border rounded-md overflow-hidden ${
//         preview ? "w-20 h-20" : "w-32 h-32"
//       } group`}
//     >
//       <img
//         src={attachment || "/placeholder.svg"}
//         alt={"attachment"}
//         width={preview ? 80 : 128}
//         height={preview ? 80 : 128}
//         className="w-full h-full object-cover"
//       />

//       {!preview && (
//         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
//           <Button variant="ghost" size="icon" className="text-white">
//             <a
//               href={attachment}
//               download={attachment}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Download className="h-5 w-5" />
//             </a>
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }

// ImageAttachment.tsx
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Attachment } from "./chat-interface";

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

  return (
    <div
      className={`relative border rounded-md overflow-hidden ${
        preview ? "w-20 h-20" : "w-32 h-32"
      } group`}
    >
      <img
        src={url}
        alt={name}
        width={preview ? 80 : 128}
        height={preview ? 80 : 128}
        className="w-full h-full object-cover"
      />

      {!preview && (
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button variant="ghost" size="icon" className="text-white">
            <a
              href={url}
              download={name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-5 w-5" />
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
