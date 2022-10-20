import { useQuery } from "@tanstack/react-query";
import { TaskModel } from "../../../../types/task";
import taskService from "../../../services/task";

export function useTask(categoryId: string, date: Date) {
  const queryKey = ["tasks", categoryId, date];
  const query = useQuery<TaskModel[], Error>(
    queryKey,
    () => taskService.read(categoryId, date),
    {
      staleTime: 10 * 60 * 1000,
    },
  );

  return query;
}
