import {
  isBefore,
  getTime,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

export function getRemainingTimeUntilMsTimestamp(timestampMs) {
  const timestampDayjs = getTime(timestampMs);
  const nowDayjs = getTime(new Date());
  if (isBefore(timestampDayjs, nowDayjs)) {
    return {
      seconds: "00",
      minutes: "00",
      hours: "00",
      days: "00",
    };
  }
  return {
    seconds: getRemainingSeconds(nowDayjs, timestampDayjs),
    minutes: getRemainingMinutes(nowDayjs, timestampDayjs),
    hours: getRemainingHours(nowDayjs, timestampDayjs),
    days: getRemainingDays(nowDayjs, timestampDayjs),
  };
}

function getRemainingSeconds(nowDayjs, timestampDayjs) {
  const seconds = differenceInSeconds(timestampDayjs, nowDayjs) % 60;
  return padWithZeros(seconds, 2);
}

function getRemainingMinutes(nowDayjs, timestampDayjs) {
  const minutes = differenceInMinutes(timestampDayjs, nowDayjs) % 60;
  return padWithZeros(minutes, 2);
}

function getRemainingHours(nowDayjs, timestampDayjs) {
  const hours = differenceInHours(timestampDayjs, nowDayjs) % 24;
  return padWithZeros(hours, 2);
}

function getRemainingDays(nowDayjs, timestampDayjs) {
  const days = differenceInDays(timestampDayjs, nowDayjs);
  return days.toString();
}

function padWithZeros(number, minLength) {
  const numberString = number.toString();
  if (numberString.length >= minLength) return numberString;
  return "0".repeat(minLength - numberString.length) + numberString;
}
