import { useQuery } from "@tanstack/react-query";
import { WeekCompleted } from "../../../../types/analytics";
import analyticsService from "../../../services/analytics";

export function useWeekCompleted() {
  const queryKey = ["week-completed"];
  const query = useQuery<WeekCompleted[], Error>(
    queryKey,
    () => analyticsService.readWeekCompleted(),
    {
      staleTime: 1 * 60 * 1000,
    },
  );

  return query;
}
