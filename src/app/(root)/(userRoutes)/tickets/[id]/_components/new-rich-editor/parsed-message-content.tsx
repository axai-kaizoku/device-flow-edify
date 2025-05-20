"use client";

import parse from "html-react-parser";
import { MentionToolTip } from "./mention-tooltip";

type Props = {
  content: any[];
};

export const ParsedMessageContent = ({ content }: Props) => {
  return (
    <div>
      {content.map((item, i) => {
        // 1) object = mention
        if (item && typeof item === "object") {
          return (
            <MentionToolTip key={i} mention={item}>
              <span className="mention">@{item.first_name ?? item.title}</span>
            </MentionToolTip>
          );
        }

        // 2) only strings get parsed
        if (typeof item === "string") {
          return <span key={i}>{parse(item)}</span>;
        }

        // 3) everything else: render nothing (or you could return null)
        return null;
      })}
    </div>
  );
};
