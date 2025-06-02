"use client";
import { useEffect, useState } from "react";
import AssetCoachMark from "./assets-coach-mark";
import TicketsCoachMark from "./ticket-coach-marks";
import { Dialog, DialogContent } from "./ui/dialog";

function CoachMarks() {
  const [step, setStep] = useState(0); // 0: Asset, 1: Tickets, 2: Done
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const hasSeenCoachMarks = localStorage.getItem("hasSeenCoachMarks");
    if (!hasSeenCoachMarks) {
      setShouldShow(true);
    }
  }, []);

  const handleNext = () => {
    if (step === 0) {
      setStep(1); // Go to TicketsCoachMark
    } else if (step === 1) {
      // All steps complete
      localStorage.setItem("hasSeenCoachMarks", "true");
      setShouldShow(false);
    }
  };

  if (!shouldShow) return null;

  return (
    <Dialog open={shouldShow} onOpenChange={setShouldShow}>
      <DialogContent className="p-4 rounded-lg max-w-sm w-fit focus:outline-none focus-visible:outline-none">
        {step === 0 && <AssetCoachMark onNext={handleNext} />}
        {step === 1 && <TicketsCoachMark onNext={handleNext} />}
      </DialogContent>
    </Dialog>
  );
}

export default CoachMarks;
