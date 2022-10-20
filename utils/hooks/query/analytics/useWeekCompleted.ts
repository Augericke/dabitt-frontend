import { useQuery } from "@tanstack/react-query";
import { WeekCompleted } from "../../../../types/analytics";
import analyticsService from "../../../services/analytics";

export function useWeekCompleted(categoryId?: string) {
  const queryKey = ["week-completed", categoryId || "all"];
  const query = useQuery<WeekCompleted[], Error>(queryKey, () =>
    analyticsService.readWeekCompleted(categoryId),
  );

  return query;
}
