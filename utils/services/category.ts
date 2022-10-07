import { api } from "../environmentManager";
import { CategoryModel, IconColors } from "../../types/task";

const create = async (data: { name: string }) => {
  const response = await api.post<CategoryModel>("/category", data);
  return response.data;
};

const read = async (query: {
  startTime: string;
  endTime: string;
  isCurrent?: 1 | 0;
  isFuture?: 1 | 0;
}) => {
  const { startTime, endTime, isCurrent, isFuture } = query;
  const currentString = isCurrent ? `&isCurrent=${isCurrent}` : "";
  const futureString = isFuture ? `&isFuture=${isFuture}` : "";
  const response = await api.get<CategoryModel[]>(
    `/category/task/?startTime=${startTime}&endTime=${endTime}` +
      currentString +
      futureString,
  );

  return response.data;
};

const update = async (
  id: string,
  data: { name?: string; iconColor?: IconColors },
) => {
  const response = await api.put(`/category/${id}`, data);
  return response.data;
};

const destroy = async (id: string) => {
  const response = await api.delete(`/category/${id}`);
  return response.data;
};

const categoryService = { create, read, update, destroy };

export default categoryService;
