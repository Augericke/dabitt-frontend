import { useQuery } from "@tanstack/react-query";
import { TaskModel } from "../../../types/task";
import taskService from "../../services/task";

export function useTask(categoryId: string, taskId?: string) {
  const queryKey = ["tasks", categoryId];
  const query = useQuery<TaskModel[], Error>(queryKey, () =>
    taskService.read(categoryId, taskId),
  );

  return query;
}
