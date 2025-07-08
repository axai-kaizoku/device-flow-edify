"use client";
import "./text-editor.css";

import Color from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./editor-menu-bar";
import { cn } from "@/lib/utils";

export const EmailTextEditor = ({
  content,
  onChange,
}: {
  content?: string;
  onChange?: (value: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Enter message here...",
      }),
    ],
    content: content ?? "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    editorProps: {
      // attributes: {
      //   class: "prose focus:outline-none min-h-[6rem] p-4",
      // },
    },
    onFocus: () => {
      // Ensure the editor gets focus when clicked
      editor?.commands.focus();
    },
    immediatelyRender: false,
  });
  return (
    <>
      <MenuBar editor={editor} />
      {/* <div onClick={() => editor?.commands.focus()} className="cursor-text"> */}
      <EditorContent
        editor={editor}
        className={cn(
          "break-words text-sm font-gilroyMedium prose-sm max-w-none max-h-[5rem] overflow-y-auto bg-background focus:outline-none p-2 hide-scrollbar w-full"
        )}
      />
      {/* </div> */}
    </>
  );
};
