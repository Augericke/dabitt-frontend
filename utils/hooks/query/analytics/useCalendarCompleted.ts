import { useQuery } from "@tanstack/react-query";
import { CalendarCompleted } from "../../../../types/analytics";
import analyticsService from "../../../services/analytics";

export function useCalendarCompleted(categoryId?: string) {
  const queryKey = ["calendar-completed", categoryId || "all"];
  const query = useQuery<CalendarCompleted[], Error>(queryKey, () =>
    analyticsService.readCalendarCompleted(categoryId),
  );

  return query;
}
