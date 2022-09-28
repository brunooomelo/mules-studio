import { useEffect, useState } from "react";
import { getRemainingTimeUntilMsTimestamp } from "utils/CountDownTimerUtils";
import { itsTimeForPublicSales, publicSale } from "utils/networkUtils";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

export function useCountDown() {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  const [isEnabled, setEnabled] = useState(() => itsTimeForPublicSales);

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  }
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isEnabled) {
        const datePublicSales = new Date(publicSale);
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
