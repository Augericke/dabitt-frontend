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

function getYesterdayTodayTomorrow(): YesterdayTodayTomorrow {
  const today = startOfDay(new Date());
  const yesterday = sub(today, { days: 1 });
  const tomorrow = add(today, { days: 1 });

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

export { formatDate, getYesterdayTodayTomorrow, displayHourMinutes };
