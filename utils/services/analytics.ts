import { CalendarCompleted, WeekCompleted } from "../../types/analytics";
import { getTimeZone } from "../dateComputer";
import { api } from "../environmentManager";

const readCalendarCompleted = async (categoryId?: string) => {
  const basePath = "/data/calendar";

  const tz = getTimeZone();
  const queryPath = categoryId
    ? `?tz=${tz}&categoryId=${categoryId}`
    : `?tz=${tz}`;

  const { data } = await api.get<CalendarCompleted[]>(basePath + queryPath);
  return data;
};

const readWeekCompleted = async () => {
  const basePath = "/data/week";

  const tz = getTimeZone();
  const queryPath = `?tz=${tz}`;

  const { data } = await api.get<WeekCompleted[]>(basePath + queryPath);
  return data;
};

const analyticsService = { readCalendarCompleted, readWeekCompleted };

export default analyticsService;
