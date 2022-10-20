import { CalendarCompleted, WeekCompleted } from "../../types/analytics";
import {} from "../../types/user";
import { api } from "../environmentManager";

const readCalendarCompleted = async (categoryId?: string) => {
  const basePath = "/data/calendar";
  const queryPath = categoryId ? `?categoryId=${categoryId}` : "";

  const { data } = await api.get<CalendarCompleted[]>(basePath + queryPath);
  return data;
};

const readWeekCompleted = async (categoryId?: string) => {
  const basePath = "/data/week";
  const queryPath = categoryId ? `?categoryId=${categoryId}` : "";

  const { data } = await api.get<WeekCompleted[]>(basePath + queryPath);
  return data;
};

const analyticsService = { readCalendarCompleted, readWeekCompleted };

export default analyticsService;
