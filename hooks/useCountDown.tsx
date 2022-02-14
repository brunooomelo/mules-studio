import { useEffect, useState } from "react";
import { getRemainingTimeUntilMsTimestamp } from "utils/CountDownTimerUtils";
import { isAfter } from "date-fns";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

export function useCountDown() {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  const [isEnabled, setEnabled] = useState(() =>
    isAfter(new Date(), new Date(process.env.NEXT_PUBLIC_PUBLIC_SALES))
  );

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  }
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isEnabled) {
        const datePublicSales = new Date(process.env.NEXT_PUBLIC_PUBLIC_SALES);
        updateRemainingTime(datePublicSales);
        setEnabled(new Date() > datePublicSales);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [isEnabled]);

  return {
    remainingTime,
    isEnabled,
  };
}
