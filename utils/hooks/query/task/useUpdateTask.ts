import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskModel } from "../../../../types/task";
import taskService, { UpdateTask } from "../../../services/task";

const updateTask = async (updateData: UpdateTask) => {
  const updatedTask = await taskService.update(updateData);
  return updatedTask;
};

export function useUpdateTask(categoryId: string, date: Date) {
  const queryClient = useQueryClient();

  const queryKey = ["tasks", categoryId, date];
  const updateMutation = useMutation(
    (updatedTask: UpdateTask) => updateTask(updatedTask),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<TaskModel[] | undefined>(
          queryKey,
          (oldTasks) =>
            oldTasks &&
            oldTasks.map((task) => (task.id !== data.id ? task : data)),
        );
      },
      onError: () => {
        console.log(updateMutation.error);
      },
    },
  );

  return updateMutation;
}
