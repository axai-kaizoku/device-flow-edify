import { cn } from "@/lib/utils";
import { forwardRef, useState, useEffect, useImperativeHandle } from "react";
import { MentionType } from "./rich-text-editor";

const MentionList = forwardRef(
  (props: { command: any; items: MentionType[] }, ref) => {
    const { items, command } = props;
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
      setSelectedIndex(0);
    }, [items]);

    const selectItem = (idx) => {
      const item = items[idx];
      if (item)
        command({
          id: JSON.stringify(item),
          // data: JSON.stringify(item),
          label: item?.first_name ?? item?.title,
        });
    };

    useImperativeHandle(ref, () => ({
      onKeyDown({ event }) {
        switch (event.key) {
          case "ArrowUp":
            setSelectedIndex(
              (prev) => (prev - 1 + items.length) % items.length
            );
            return true;
          case "ArrowDown":
            setSelectedIndex((prev) => (prev + 1) % items.length);
            return true;
          case "Enter":
            selectItem(selectedIndex);
            return true;
          default:
            return false;
        }
      },
    }));

    return (
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-auto max-h-60">
        {items.length > 0 ? (
          items.map((item, idx) => (
            <button
              key={item._id || idx}
              onClick={() => selectItem(idx)}
              className={cn(
                "w-full flex items-center px-3 py-2 text-sm transition",
                idx === selectedIndex
                  ? "bg-blue-500 text-white" // selected state
                  : "hover:bg-gray-100" // hover state
              )}
            >
              <span>{item.first_name ?? item.title}</span>
              {item.title && (
                <span className="ml-2 text-xs bg-gray-200 rounded-full px-2">
                  team
                </span>
              )}
            </button>
          ))
        ) : (
          <div className="px-3 py-2 text-sm text-gray-500">No results</div>
        )}
      </div>
    );
  }
);

export default MentionList;
