import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
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
        toast.error(`We ran into an issue creating this task.`, { id: "task" });
      },
    },
  );

  return createMutation;
}
