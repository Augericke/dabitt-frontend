import { api } from "../environmentManager";
import { TaskModel } from "../../types/task";

const create = async (
  data: { categoryId: string; description: string },
  headers: {},
) => {
  const response = await api.post<TaskModel>("/task", data, headers);
  return response.data;
};

const update = async (
  id: string,
  data: { completedAt?: Date | null },
  headers: {},
) => {
  const response = await api.put(`/task/${id}`, data, headers);
  return response.data;
};

const destroy = async (id: string, header: {}) => {
  const response = await api.delete(`/task/${id}`, header);
  return response.data;
};

const taskService = { create, update, destroy };

export default taskService;
