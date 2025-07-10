"use client";
import "./text-editor.css";

import { cn } from "@/lib/utils";
import { fetchUsersTeams } from "@/server/ticketActions";
import Color from "@tiptap/extension-color";
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, ReactRenderer, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef } from "react";
import tippy from "tippy.js";
import { MenuBar } from "./editor-menu-bar";
import DynamicValuesList from "./dynamic-values-list";

export const EmailTextEditor = ({
  content,
  data,
  onChange,
}: {
  content?: string;
  data?: any;
  onChange?: (value: string) => void;
}) => {
  const popupRef = useRef(null);

  const listData = data;

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
      // Mention.configure({
      //   HTMLAttributes: {
      //     class: "mention",
      //   },
      //   renderText: ({ node }) => `{${node.attrs.label}}`,
      //   suggestion: {
      //     items: ({ query }) => {
      //       return new Promise((resolve) => {
      //         setTimeout(() => {
      //           resolve(getFilteredMentions(query));
      //         }, 0);
      //       });
      //     },

      //     render: () => {
      //       let component;
      //       return {
      //         onStart: (props) => {
      //           component = new ReactRenderer(MentionList, {
      //             props,
      //             editor: props.editor,
      //           });
      //           if (!props.clientRect) return;
      //           const instance = tippy("body", {
      //             getReferenceClientRect: props.clientRect,
      //             appendTo: () => document.body,
      //             content: component.element,
      //             showOnCreate: true,
      //             interactive: true,
      //             trigger: "manual",
      //             placement: "bottom-start",
      //             theme: "custom",
      //           });
      //           popupRef.current = instance[0];
      //         },
      //         onUpdate: (props) => {
      //           // component.updateProps(props);
      //           if (component?.updateProps) {
      //             component.updateProps(props);
      //           }
      //           if (!props.clientRect || !popupRef.current) return;
      //           popupRef.current.setProps({
      //             getReferenceClientRect: props.clientRect,
      //           });
      //         },
      //         onKeyDown: (props) => {
      //           // const handled = component?.ref?.onKeyDown(props);
      //           // if (handled) return true;
      //           if (
      //             component?.ref?.onKeyDown &&
      //             typeof component.ref.onKeyDown === "function"
      //           ) {
      //             const handled = component.ref.onKeyDown(props);
      //             if (handled) return true;
      //           }
      //           if (props?.event?.key === "Escape" && popupRef.current) {
      //             popupRef.current.hide();
      //             return true;
      //           }
      //           return false;
      //         },
      //         onExit: () => {
      //           if (popupRef.current) popupRef.current.destroy();
      //           popupRef.current = null;
      //           component.destroy();
      //         },
      //       };
      //     },
      //   },
      // }),
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        renderText: ({ node }) => `{${node.attrs.label}}`, // Display as {first_name}
        suggestion: {
          char: "{", // Trigger with {
          startOfLine: false,
          command: ({ editor, range, props }) => {
            const formattedLabel = `{ ${props.label} }`;
            editor
              .chain()
              .focus()
              .insertContentAt(range, [
                {
                  type: "text",
                  text: formattedLabel + " ", // Add space after mention for clean typing
                },
              ])
              .run();
          },
          items: async ({ query }) => {
            const strippedQuery = query.replace("{", "").trim(); // ensure clean query
            // ["Email","First Name","Last Name","Role","Employemnet Type","Team","Designation"]
            const filtered = listData.filter((v) => v.includes(strippedQuery));
            console.log(filtered, "Filtered");
            return filtered.map((item) => ({
              id: item,
              label: item,
            }));
          },
          render: () => {
            let component;
            return {
              onStart: (props) => {
                component = new ReactRenderer(DynamicValuesList, {
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
                  theme: "custom",
                });
                popupRef.current = instance[0];
              },
              onUpdate: (props) => {
                component?.updateProps?.(props);
                popupRef.current?.setProps?.({
                  getReferenceClientRect: props.clientRect,
                });
              },
              onKeyDown: (props) => {
                if (component?.ref?.onKeyDown?.(props)) return true;
                if (props.event.key === "Escape") {
                  popupRef.current?.hide();
                  return true;
                }
                return false;
              },
              onExit: () => {
                popupRef.current?.destroy();
                popupRef.current = null;
                component?.destroy();
              },
            };
          },
        },
      }),
    ],
    content: content ?? "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    onFocus: () => {
      // Ensure the editor gets focus when clicked
      editor?.commands.focus();
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

  return (
    <>
      <MenuBar editor={editor} />

      <div
      // className={cn(
      //   "w-full max-h-[20rem] overflow-y-auto hide-scrollbar border-t border-muted"
      // )}
      >
        <EditorContent
          editor={editor}
          className={cn(
            "break-words text-sm font-gilroyMedium prose-sm max-w-none min-h-[1rem] max-h-[20rem] overflow-y-auto bg-background focus:outline-none p-2 hide-scrollbar w-full"
          )}
        />
      </div>
    </>
  );
};
