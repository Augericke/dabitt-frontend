import { format, startOfDay, endOfDay, add, isEqual } from "date-fns";

function formatDate(date: Date, formatString: string): string {
  return format(new Date(date), formatString);
}

function getTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function getUTCDayRange(date: Date) {
  const startTime = startOfDay(new Date(date)).toISOString();
  const endTime = endOfDay(new Date(date)).toISOString();

  return { startTime, endTime };
}

function getIsCurrent(date: Date) {
  const startToday = startOfDay(new Date());
  return isEqual(startToday, startOfDay(date));
}

function getIsFuture(date: Date) {
  const startTomorrow = startOfDay(add(new Date(), { days: 1 }));
  return isEqual(startTomorrow, startOfDay(date));
}

function displayHourMinutes(minutes: number): string {
  const hours = minutes / 60;
  const completeHours = Math.floor(hours);
  const remainingMinutes = Math.round((hours - completeHours) * 60);

  const hourText =
    completeHours > 0
      ? `${completeHours} hour${completeHours > 1 ? "s" : ""}`
      : "";

  const minuteText =
    remainingMinutes > 0
      ? `${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`
      : "";
  return `${hourText} ${minuteText}`;
}

export {
  formatDate,
  getTimeZone,
  displayHourMinutes,
  getUTCDayRange,
  getIsCurrent,
  getIsFuture,
};
