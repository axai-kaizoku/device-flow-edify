"use client";

import { GetAvatar } from "@/components/get-avatar";
import { formatChatTimestamp, isToday, isYesterday } from "@/lib/utils";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { Attachments } from "./attachments";
import { RawComment } from "./chat-interface";
import { MessageListWrapper } from "./message-list.wrapper";
import {
  ParsedMessageContent,
  ParsedMessageSystem,
} from "./new-rich-editor/parsed-message-content";

interface MessageListProps {
  messages: RawComment[];
}

export type MessageListRef = {
  scrollToFirstAttachment: () => void;
};

export const MessageList = forwardRef<MessageListRef, MessageListProps>(
  ({ messages }, ref) => {
    const messageListRef = useRef<HTMLDivElement>(null);

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
        {sortedDays?.map((day, i) => {
          if (!day || typeof day !== "string") return null;

          const date = new Date(day);
          if (isNaN(date.getTime())) return null;

          let label = isToday(date)
            ? "Today"
            : isYesterday(date)
            ? "Yesterday"
            : day;

          return (
            <div key={`${day}-${i + 1}`} className="space-y-4">
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-gray-200" />
                <span className="flex-shrink-0 mx-4 font-gilroyMedium text-xs text-gray-500">
                  {label}
                </span>
                <div className="flex-grow border-t border-gray-200" />
              </div>

              {grouped[day].map((msg, i) =>
                msg.type === "system" ? (
                  <div
                    key={`${msg.timestamp}-${i + 34}`}
                    className="flex justify-center items-start"
                  >
                    <div className="flex-1 flex items-center justify-center">
                      {/* {JSON.stringify()} */}
                      {msg.content[0].includes("closed") ? (
                        <ParsedMessageSystem
                          content={msg?.content}
                          className="text-xs mx-2 text-red-500 font-gilroyMedium"
                        />
                      ) : (
                        <ParsedMessageSystem
                          content={msg?.content}
                          className="text-xs mx-2 text-[#008910] font-gilroyMedium"
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    key={`${msg.timestamp}-${i + 9}`}
                    className="flex items-start gap-3 pt-3"
                  >
                    <GetAvatar name={msg?.user?.name} size={24} />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 ">
                        <span className="font-gilroySemiBold text-sm">
                          {msg.user.name}
                        </span>
                        <span className="text-xs font-gilroyRegular text-muted-foreground">
                          {formatChatTimestamp(msg.timestamp)}
                        </span>
                      </div>
                      <div className="flex flex-col gap-3 bg-muted/40 p-2 pl-4 rounded-md">
                        <ParsedMessageContent
                          content={msg?.content}
                          className="font-gilroyMedium text-[#333]"
                        />

                        {msg.attachments?.length > 0 && (
                          <Attachments attachments={msg.attachments} />
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          );
        })}
      </MessageListWrapper>
    );
  }
);

MessageList.displayName = "MessageList";
