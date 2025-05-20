"use client";
import React, { useEffect, useState } from "react";
import AssetCoachMark from "./assets-coach-mark";
import TicketsCoachMark from "./ticket-coach-marks";

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
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      {step === 0 && <AssetCoachMark onNext={handleNext} />}
      {step === 1 && <TicketsCoachMark onNext={handleNext} />}
    </div>
  );
}

export default CoachMarks;
