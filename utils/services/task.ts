import { api } from "../environmentManager";
import { TaskModel } from "../../types/task";

export interface DeleteTask {
  categoryId: string;
  taskId: string;
}

export interface CreateTask {
  categoryId: string;
  data: {
    description: string;
    estimateMinutes?: number;
    startAt?: Date | null;
  };
}

export interface UpdateTask {
  categoryId: string;
  taskId: string;
  data: {
    description?: string;
    completedAt?: Date | null;
    startAt?: Date | null;
    estimateMinutes?: number;
  };
}

const create = async (newTask: CreateTask) => {
  const response = await api.post<TaskModel>(
    `/category/${newTask.categoryId}/task`,
    newTask.data,
  );
  return response.data;
};

const read = async (categoryId: string, taskId?: string) => {
  const { data } = await api.get<TaskModel[]>(
    `/category/${categoryId}/task/${taskId || ""}`,
  );
  return data;
};

const update = async ({ categoryId, taskId, data }: UpdateTask) => {
  const response = await api.put(
    `/category/${categoryId}/task/${taskId}`,
    data,
  );
  return response.data;
};

const destroy = async ({ categoryId, taskId }: DeleteTask) => {
  const response = await api.delete(`/category/${categoryId}/task/${taskId}`);
  return response.data;
};

const taskService = { create, read, update, destroy };

export default taskService;
