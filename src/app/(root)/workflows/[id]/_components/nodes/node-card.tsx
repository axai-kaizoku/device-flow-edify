"use client";

import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";

export const NodeCard = ({
  children,
  nodeId,
  isSelected,
  className,
  onClick,
}: {
  children: React.ReactNode;
  nodeId: string;
  isSelected: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  const { getNode, setCenter } = useReactFlow();
  return (
    <div
      onClick={onClick}
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) return;
        const { position, measured } = node;
        if (!position || !measured) return;
        const { width, height } = measured;

        const x = position.x;
        const y = position.y;
        if (x === undefined || y === undefined) return;
        setCenter(x, y, { zoom: 1, duration: 200 });
      }}
      className={cn(
        "rounded-md w-[240px] min-w-0 p-2 font-gilroyMedium border text-xs bg-background",
        isSelected && " border-green-500",
        className
      )}
    >
      {children}
    </div>
  );
};
