import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskModel } from "../../../types/task";
import taskService, { DeleteTask, UpdateTask } from "../../services/task";

const deleteTask = async ({ categoryId, taskId }: DeleteTask) => {
  const deletedTask = await taskService.destroy({ categoryId, taskId });
  return deletedTask;
};

export function useDeleteTask(categoryId: string, taskId: string, date: Date) {
  const queryClient = useQueryClient();

  const queryKey = ["tasks", categoryId, date];
  const deleteMutation = useMutation(
    (deletedTask: DeleteTask) => deleteTask(deletedTask),
    {
      onSuccess: () => {
        queryClient.setQueryData<TaskModel[] | undefined>(
          queryKey,
          (oldTasks) =>
            oldTasks && oldTasks.filter((oldTask) => oldTask.id != taskId),
        );
      },
      onError: () => {
        console.log(deleteMutation.error);
      },
    },
  );

  return deleteMutation;
}
