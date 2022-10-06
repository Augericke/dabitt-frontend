import { api } from "../environmentManager";
import { CategoryModel, IconColors } from "../../types/task";

const create = async (data: { name: string }, headers: {}) => {
  const response = await api.post<CategoryModel>("/category", data, headers);
  return response.data;
};

const read = async (
  query: {
    startTime: string;
    endTime: string;
    isCurrent?: 1 | 0;
    isFuture?: 1 | 0;
  },
  headers: {},
) => {
  const { startTime, endTime, isCurrent, isFuture } = query;
  const currentString = isCurrent ? `&isCurrent=${isCurrent}` : "";
  const futureString = isFuture ? `&isFuture=${isFuture}` : "";
  const response = await api.get<CategoryModel[]>(
    `/category/task/?startTime=${startTime}&endTime=${endTime}` +
      currentString +
      futureString,
    headers,
  );

  return response.data;
};

const update = async (
  id: string,
  data: { name?: string; iconColor?: IconColors },
  headers: {},
) => {
  const response = await api.put(`/category/${id}`, data, headers);
  return response.data;
};

const destroy = async (id: string, headers: {}) => {
  const response = await api.delete(`/category/${id}`, headers);
  return response.data;
};

const categoryService = { create, read, update, destroy };

export default categoryService;
