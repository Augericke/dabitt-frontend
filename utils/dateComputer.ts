import { format, startOfDay, add, sub } from "date-fns";

function formatDate(date: Date, formatString: string): string {
  return format(new Date(date), formatString);
}

export type YesterdayTodayTomorrow = {
  yesterday: {
    date: Date;
    text: String;
  };
  today: {
    date: Date;
    text: String;
  };
  tomorrow: {
    date: Date;
    text: String;
  };
};

function getYesterday(date: Date) {
  const today = startOfDay(new Date(date));
  return sub(today, { days: 1 });
}

function getTomorrow(date: Date) {
  const today = startOfDay(new Date(date));
  return add(today, { days: 1 });
}

function getYesterdayTodayTomorrow(): YesterdayTodayTomorrow {
  const today = startOfDay(new Date());
  const yesterday = getYesterday(today);
  const tomorrow = getTomorrow(today);

  const dates = {
    yesterday: {
      date: yesterday,
      text: "yesterday",
    },
    today: {
      date: today,
      text: "today",
    },
    tomorrow: {
      date: tomorrow,
      text: "tomorrow",
    },
  };

  return dates;
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
  getYesterdayTodayTomorrow,
  displayHourMinutes,
  getYesterday,
  getTomorrow,
};
