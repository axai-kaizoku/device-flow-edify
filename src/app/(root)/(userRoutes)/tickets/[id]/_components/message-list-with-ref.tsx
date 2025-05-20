"use client";

import { GetAvatar } from "@/components/get-avatar";
import {
  formatDate,
  formatDistanceToNow,
  isImageAttachment,
  isToday,
  isYesterday,
} from "@/lib/utils";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { Message, RawComment } from "./chat-interface";
import { FileAttachment } from "./file-attachment";
import { ImageAttachment } from "./image-attachment";
import { MessageListWrapper } from "./message-list.wrapper";
import { ParsedMessageContent } from "./new-rich-editor/parsed-message-content";

interface MessageListProps {
  messages: RawComment[];
}

export type MessageListRef = {
  scrollToFirstAttachment: () => void;
};

export const MessageList = forwardRef<MessageListRef, MessageListProps>(
  ({ messages }, ref) => {
    const messageListRef = useRef<HTMLDivElement>(null);

    const scrollToFirstAttachment = () => {
      if (!messageListRef.current) return;

      const attachmentElements = messageListRef.current.querySelectorAll(
        "[data-attachment-section]"
      );
      if (attachmentElements.length > 0) {
        attachmentElements[0].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    useImperativeHandle(ref, () => ({
      scrollToFirstAttachment,
    }));

    const grouped = useMemo(() => {
      return messages?.reduce((acc, msg) => {
        const day = msg?.timestamp?.slice(0, 10);
        (acc[day] ??= []).push(msg);
        return acc;
      }, {});
    }, [messages]);

    const sortedDays = Object.keys(grouped ?? []);

    return (
      <MessageListWrapper ref={messageListRef}>
        {sortedDays?.map((day) => {
          const date = new Date(day);
          let label = formatDate(date);
          if (isToday(date)) label = "Today";
          else if (isYesterday(date)) label = "Yesterday";

          return (
            <div key={day} className="space-y-4">
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-xs text-gray-500">
                  {label}
                </span>
                <div className="flex-grow border-t border-gray-200" />
              </div>

              {grouped[day].map((msg) => (
                <div key={msg.timestamp} className="flex items-start gap-3">
                  <GetAvatar name={msg?.user?.name} />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{msg.user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(msg.timestamp))}
                      </span>
                    </div>

                    <ParsedMessageContent content={msg?.content} />

                    {msg.attachments.length > 0 && (
                      <div
                        className="mt-2 flex flex-wrap gap-2"
                        data-attachment-section
                      >
                        {msg.attachments.map((attachment: string) => (
                          <div key={attachment}>
                            {isImageAttachment(attachment) ? (
                              <ImageAttachment
                                key={attachment}
                                attachment={attachment}
                              />
                            ) : (
                              <FileAttachment
                                key={attachment}
                                attachment={attachment}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </MessageListWrapper>
    );
  }
);

MessageList.displayName = "MessageList";
