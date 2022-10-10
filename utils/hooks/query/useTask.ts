import { useQuery } from "@tanstack/react-query";
import { TaskModel } from "../../../types/task";
import { getUTCDayRange } from "../../dateComputer";
import taskService from "../../services/task";

export function useTask(categoryId: string, date: Date) {
  const { startTime } = getUTCDayRange(date);
  const queryKey = ["tasks", categoryId, startTime];
  const query = useQuery<TaskModel[], Error>(queryKey, () =>
    taskService.read(categoryId, date),
  );

  return query;
}
