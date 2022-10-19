import { CalendarCompleted } from "../../types/analytics";
import {} from "../../types/user";
import { api } from "../environmentManager";

const readCalendarCompleted = async (categoryId?: string) => {
  const basePath = "/data/calendar";
  const queryPath = categoryId ? `?categoryId=${categoryId}` : "";

  const { data } = await api.get<CalendarCompleted[]>(basePath + queryPath);
  return data;
};

const analyticsService = { readCalendarCompleted };

export default analyticsService;
