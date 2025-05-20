import React from "react";
import { Button } from "./buttons/Button";
import { AssetsIcons } from "@/app/(root)/assets/icons";

function AssetCoachMark({ onNext }: { onNext: () => void }) {
  return (
    <div className="bg-white  flex flex-col items-center py-6 px-7 gap-3 rounded-2xl max-w-sm w-full">
      <div className="text-start flex flex-col gap-4">
        <AssetsIcons.assetsCoachMarks className="mx-auto rounded-xl" />
        <h1 className="text-lg font-gilroySemiBold text-gray-800">
          Asset Timeline
        </h1>
      </div>

      <p className="text-sm text-gray-600 font-gilroyMedium text-start leading-relaxed">
        Follow your assets every step of the way. The Asset Timeline helps you
        see when items were added, who used them, what changes were made, and
        when they were retired — all in one organized, easy-to-understand
        timeline.
      </p>

      <Button variant="primary" className="w-full text-sm" onClick={onNext}>
        Next
      </Button>
    </div>
  );
}

export default AssetCoachMark;
