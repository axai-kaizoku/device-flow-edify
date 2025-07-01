import { ParamProps } from "../../types/app-node";

export const IntegrationAppParam = ({
  param,
  updateNodeParamValue,
  value,
}: ParamProps) => {
  return (
    <div className="space-y-1 p-1 w-full">
      <p className="text-xs">{param?.name}</p>
    </div>
  );
};
