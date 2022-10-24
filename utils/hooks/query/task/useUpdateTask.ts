import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskModel } from "../../../../types/task";
import { getIsCurrent, getUTCDayRange } from "../../../dateComputer";
import taskService, { UpdateTask } from "../../../services/task";

const updateTask = async (updateData: UpdateTask) => {
  const updatedTask = await taskService.update(updateData);
  return updatedTask;
};

export function useUpdateTask(
  categoryId: string,
  date: Date,
  moveToCurrent?: boolean,
) {
  const queryClient = useQueryClient();

  const queryKey = ["tasks", categoryId, date];
  const updateMutation = useMutation(
    (updatedTask: UpdateTask) => updateTask(updatedTask),
    {
      onSuccess: (data) => {
        if (moveToCurrent && !getIsCurrent(date)) {
          // Remove item from selected day cache
          queryClient.setQueryData<TaskModel[] | undefined>(
            queryKey,
            (oldTasks) =>
              oldTasks && oldTasks.filter((oldTask) => oldTask.id != data.id),
          );

          // Add item to current day cache
          const { startTime } = getUTCDayRange(new Date());
          queryClient.setQueryData<TaskModel[] | undefined>(
            ["tasks", categoryId, new Date(startTime)],
            (oldTasks) => oldTasks && [...oldTasks, data],
          );
        } else {
          queryClient.setQueryData<TaskModel[] | undefined>(
            queryKey,
            (oldTasks) =>
              oldTasks &&
              oldTasks.map((task) => (task.id !== data.id ? task : data)),
          );
        }
      },
      onError: () => {
        console.log(updateMutation.error);
      },
    },
  );

  return updateMutation;
}
