import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskModel } from "../../../../types/task";
import taskService, { CreateTask } from "../../../services/task";

const createTask = async (data: CreateTask) => {
  const addedTask = await taskService.create(data);
  return addedTask;
};

export function useCreateTask(categoryId: string, date: Date) {
  const queryClient = useQueryClient();

  const queryKey = ["tasks", categoryId, date];
  const createMutation = useMutation(
    (newTask: CreateTask) => createTask(newTask),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<TaskModel[] | undefined>(
          queryKey,
          (oldTasks) => oldTasks && [...oldTasks, data],
        );
      },
      onError: () => {
        console.log(createMutation.error);
      },
    },
  );

  return createMutation;
}
