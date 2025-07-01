import { Input } from "@/components/ui/input";
import { ParamProps } from "../../types/app-node";
import { useState } from "react";

export const StringParam = ({
  param,
  updateNodeParamValue,
  value,
}: ParamProps) => {
  const [internalValue, setInternalValue] = useState(value);
  return (
    <div className="space-y-1 p-1 w-full">
      <Input
        placeholder="Enter your value"
        className="text-xs"
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={(e) => updateNodeParamValue(e.target.value)}
      />
    </div>
  );
};
