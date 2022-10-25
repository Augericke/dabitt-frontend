import { useMutation, useQueryClient } from "@tanstack/react-query";
import { add } from "date-fns";
import toast from "react-hot-toast";
import { TaskModel } from "../../../../types/task";
import taskService, { UpdateTask } from "../../../services/task";

const updateTask = async (updateData: UpdateTask) => {
  const updatedTask = await taskService.update(updateData);
  return updatedTask;
};

export function useKickTask(categoryId: string, taskId: string, date: Date) {
  const queryClient = useQueryClient();

  const queryKey = ["tasks", categoryId, date];
  const canKickMutation = useMutation(
    (updatedTask: UpdateTask) => updateTask(updatedTask),
    {
      onSuccess: (data) => {
        // Remove item from selected day cache
        queryClient.setQueryData<TaskModel[] | undefined>(
          queryKey,
          (oldTasks) =>
            oldTasks && oldTasks.filter((oldTask) => oldTask.id != taskId),
        );

        // Add item to next days cache
        queryClient.setQueryData<TaskModel[] | undefined>(
          ["tasks", categoryId, add(date, { days: 1 })],
          (oldTasks) => oldTasks && [...oldTasks, data],
        );
      },
      onError: () => {
        toast.error(`We ran into an issue kicking this task.`, { id: "task" });
      },
    },
  );

  return canKickMutation;
}
