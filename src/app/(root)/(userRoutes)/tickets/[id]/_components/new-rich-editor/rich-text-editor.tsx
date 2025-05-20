"use client";

import { Button } from "@/components/ui/button";
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import {
  BubbleMenu,
  EditorContent,
  ReactRenderer,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AtSign,
  Bold,
  Italic,
  List,
  Loader2,
  Paperclip,
  Send,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { FileAttachment } from "../file-attachment";
import { ImageAttachment } from "../image-attachment";
// import { MentionList } from "../mention-list";
// import { USERS } from "@/lib/mock-data"
import { fetchUsersTeams } from "@/server/ticketActions";
import tippy from "tippy.js";
import { Attachment } from "../chat-interface";
import MentionList from "./mention-list";

// No additional imports needed for input rules

interface RichTextEditorProps {
  onSendMessage: (content: string, attachments: File[]) => void;
  loading?: boolean;
}

export type MentionType = {
  _id?: string;
  first_name?: string;
  email?: string;
  title?: string;
  description?: string;
  team_code?: string;
};

const getFilteredMentions = (query: string) => {
  return fetchUsersTeams(query)
    .then((res) => {
      const data = [];
      data.push(...res.teams, ...res.users);
      return data; // Return the populated data array
    })
    .catch((error) => {
      return []; // Return an empty array in case of an error
    });
};

type AttachmentWithId = {
  id: string;
  file: File;
};
export function RichTextEditor({
  onSendMessage,
  loading,
}: RichTextEditorProps) {
  const [attachments, setAttachments] = useState<AttachmentWithId[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  const popupRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Placeholder.configure({
        placeholder: "Type your message...",
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        renderText: ({ node }) => `@${node.attrs.label}`,
        suggestion: {
          items: ({ query }) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(getFilteredMentions(query));
              }, 0);
            });
          },

          render: () => {
            let component;
            return {
              onStart: (props) => {
                component = new ReactRenderer(MentionList, {
                  props,
                  editor: props.editor,
                });
                if (!props.clientRect) return;
                const instance = tippy("body", {
                  getReferenceClientRect: props.clientRect,
                  appendTo: () => document.body,
                  content: component.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: "manual",
                  placement: "bottom-start",
                });
                popupRef.current = instance[0];
              },
              onUpdate: (props) => {
                component.updateProps(props);
                if (!props.clientRect || !popupRef.current) return;
                popupRef.current.setProps({
                  getReferenceClientRect: props.clientRect,
                });
              },
              onKeyDown: (props) => {
                const handled = component.ref.onKeyDown(props);
                if (handled) return true;
                if (props.event.key === "Escape" && popupRef.current) {
                  popupRef.current.hide();
                  return true;
                }
                return false;
              },
              onExit: () => {
                if (popupRef.current) popupRef.current.destroy();
                popupRef.current = null;
                component.destroy();
              },
            };
          },
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      setIsTyping(editor.getText().trim().length > 0);
    },

    editorProps: {
      handleKeyDown: (view, event) => {
        if (event.key === "Enter") {
          if (event.shiftKey) {
            // allow newline
            return false;
          }
          // prevent default behavior
          event.preventDefault();
          if (popupRef.current) {
            // let suggestion plugin handle selection
            return false;
          }
          // send message
          handleSend();
          return true;
        }
        return false;
      },
    },
    // editorProps: { handleKeyDown: () => false },
    immediatelyRender: false,
  });

  const handleAttachFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: AttachmentWithId[] = Array.from(files).map(
      (file) => ({
        id: Date.now().toString() + Math.random().toString(36).slice(2, 8),
        file,
      })
    );

    setAttachments((prev) => [...prev, ...newAttachments]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((attachment) => attachment.id !== id));
  };

  const handleSend = () => {
    if (!editor) return;

    const content = editor.getHTML();
    if (content.trim() === "<p></p>" && attachments.length === 0) return;

    const filesToSend = attachments.map((att) => att.file);

    onSendMessage(content, filesToSend); // Only send File[]
    editor.commands.clearContent();
    setAttachments([]);
    setIsTyping(false);
  };

  return (
    <div className="space-y-2" ref={editorContainerRef}>
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-gray-50">
          {attachments.map((attachment) => {
            const file = attachment.file;
            const previewUrl = URL.createObjectURL(file);
            const isImage = file.type.startsWith("image/");

            return (
              <div key={attachment.id} className="relative group">
                {isImage ? (
                  <div className="relative">
                    <ImageAttachment
                      attachment={{ url: previewUrl, name: file.name }}
                      preview
                    />
                    <button
                      onClick={() => removeAttachment(attachment.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <FileAttachment attachment={{ name: file.name }} preview />
                    <button
                      onClick={() => removeAttachment(attachment.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="border rounded-md">
        <div className="h-full p-3">
          {editor && (
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <div className="flex bg-white border rounded-md shadow-sm">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={editor.isActive("bold") ? "bg-gray-100" : ""}
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={editor.isActive("italic") ? "bg-gray-100" : ""}
                >
                  <Italic className="h-4 w-4" />
                </Button>
              </div>
            </BubbleMenu>
          )}
          <EditorContent
            editor={editor}
            className="prose text-sm font-gilroyMedium prose-sm max-w-none max-h-[5rem] overflow-y-auto bg-background focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between p-2 border-t">
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={editor?.isActive("bold") ? "bg-gray-100" : ""}
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={editor?.isActive("italic") ? "bg-gray-100" : ""}
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => editor?.chain().focus().insertContent("@").run()}
              title="Mention"
            >
              <AtSign className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleAttachFiles}
              title="Attach Files"
            >
              <Paperclip className="h-4 w-4" />
              <input
                ref={fileInputRef}
                type="file"
                // multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </Button>
          </div>

          <Button
            type="button"
            size="sm"
            onClick={handleSend}
            disabled={!isTyping && attachments.length === 0}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin size-4" />
                Send
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send
              </>
            )}
          </Button>
        </div>

        {isTyping && (
          <div className="px-3 py-1 text-xs font-gilroyRegular text-gray-500 border-t">
            Shift + Enter to add a new line
          </div>
        )}
      </div>
    </div>
  );
}
