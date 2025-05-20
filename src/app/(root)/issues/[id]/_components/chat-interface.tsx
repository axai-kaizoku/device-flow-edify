"use client";

import { useEffect, useRef, useState } from "react";
import { MessageList, type MessageListRef } from "./message-list-with-ref";
import "./text-editor.css";
import {
  MentionType,
  RichTextEditor,
} from "./new-rich-editor/rich-text-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Paperclip } from "lucide-react";
import {
  ChatPayload,
  sendChatMessage,
  TicketData,
} from "@/server/ticketActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getImageUrl } from "@/components/utils/upload";

export interface Attachment {
  id?: string;
  name?: string;
  type?: string;
  url?: string;
  size?: number;
}

export interface Message {
  id: string;
  content: string;
  attachments: Attachment[];
}

export type RawComment = {
  user: { id: string; name: string; email: string };
  timestamp: string;
  content: string[] | MentionType;
  attachments: string[];
};

export default function ChatInterface({ data }: { data: TicketData }) {
  const [messages, setMessages] = useState<RawComment[]>();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  // console.log(data);

  useEffect(() => {
    if (!data?.commentsByDate) return;
    setLoading(true);
    const flat = data.commentsByDate.flatMap((group) =>
      group.messages.map((raw) => ({
        user: {
          id: raw.byDetails._id,
          name: raw.byDetails.first_name,
          email: raw.byDetails.email,
        },
        timestamp: raw.timestamp,
        content: raw.message,
        attachments: raw.attachments,
        type: raw.type,
      }))
    );

    setMessages(flat);
    setLoading(false);
  }, [data]);

  const mutation = useMutation({
    mutationFn: sendChatMessage,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetch-ticket-by-id", data?._id],
      });
      setLoading(false);
    },
    onError: () => {
      toast.error("Error sending message");
      setLoading(false);
    },
  });

  // Add a ref for the MessageList component
  const messageListRef = useRef<MessageListRef>(null);

  function htmlToApiArray(
    html: string
  ): Array<string | MentionType | MentionType> {
    const result: Array<string | MentionType | MentionType> = [];
    let lastIndex = 0;

    // same regex as before
    const mentionRegex =
      /<span[^>]*data-type="mention"[^>]*data-id="([^"]+)"[^>]*>[\s\S]*?<\/span>/g;

    let m: RegExpExecArray | null;
    while ((m = mentionRegex.exec(html))) {
      // 1) push any HTML between the last match and this one
      if (m.index > lastIndex) {
        result.push(html.substring(lastIndex, m.index));
      }

      // 2) decode &quot; → " and parse the JSON
      try {
        const rawAttr = m[1];
        const decoded = rawAttr.replace(/&quot;/g, '"');
        const data = JSON.parse(decoded);

        const { _id, ...rest } = data;
        // user vs team by checking keys
        console.log(data, "htmltoapi");
        if ("title" in data) {
          // data.map((m) => m._id) to m.teamId
          result.push({ teamId: _id, ...rest });
        } else {
          // data.map((m) => m._id) to m.userId
          result.push({ userId: _id, ...rest });
        }
      } catch {
        // fallback to raw tag if parse fails
        result.push(m[0]);
      }

      lastIndex = mentionRegex.lastIndex;
    }

    // 3) any trailing HTML after the last mention
    if (lastIndex < html.length) {
      result.push(html.substring(lastIndex));
    }

    return result;
  }

  const handleSendMessage = async (content: string, files: File[]) => {
    const isContentEmpty = (html: string) => {
      // Remove HTML tags
      const text = html
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, "")
        .trim();
      return text === "";
    };

    if (isContentEmpty(content) && files.length === 0) return;

    setLoading(true);

    try {
      const apiMessage = htmlToApiArray(content);

      // Upload files
      const validFiles = files.filter((file) => {
        const isValidSize = file.size <= 1024 * 1024 * 5; // 1MB
        return isValidSize;
      });

      if (validFiles.length !== files.length) {
        toast.error("Some files were too large. Max size allowed is 5MB.");
      }

      let uploadedUrls: string[] = [];

      if (validFiles.length > 0) {
        const uploadPromises = validFiles.map((file) => getImageUrl({ file }));
        const results = await Promise.all(uploadPromises);
        uploadedUrls = results.map((res) => res.fileUrl);
      }

      // Send message with uploaded file URLs
      mutation.mutate({
        payload: {
          dialogue: { message: apiMessage, attachments: uploadedUrls },
          ticketId: data._id,
        },
      });
    } catch (error) {
      toast.error("Failed to send message.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full rounded-none border-none shadow-none">
      <CardHeader className="border-b">
        <div className="flex items-center gap-2">
          <CardTitle className="font-gilroyMedium font-medium">
            Messages
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col h-[calc(59vh)]">
          <div className="flex-1 overflow-y-auto px-4 pt-4 hide-scrollbar">
            <MessageList messages={messages} ref={messageListRef} />
          </div>
          <div className="p-4">
            {/* {JSON.stringify(data?.closedAt ? true : false)} */}
            <RichTextEditor
              isClosed={data?.closedAt ? true : false}
              loading={loading ?? mutation?.isPending}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
