import { api } from "../environmentManager";
import { TaskModel } from "../../types/task";

const create = async (data: { categoryId: string; description: string }) => {
  const response = await api.post<TaskModel>("/task", data);
  return response.data;
};

const update = async (id: string, data: { completedAt?: Date | null }) => {
  const response = await api.put(`/task/${id}`, data);
  return response.data;
};

const destroy = async (id: string) => {
  const response = await api.delete(`/task/${id}`);
  return response.data;
};

const taskService = { create, update, destroy };

export default taskService;
