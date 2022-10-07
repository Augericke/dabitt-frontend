import { api } from "../environmentManager";
import { CategoryModel, IconColors } from "../../types/task";

const create = async (data: { name: string }) => {
  const response = await api.post<CategoryModel>("/category", data);
  return response.data;
};

export type RequestCategoryTask = {
  startTime: string;
  endTime: string;
  isCurrent?: 1 | 0;
  isFuture?: 1 | 0;
};

const read = async ({
  startTime,
  endTime,
  isCurrent,
  isFuture,
}: RequestCategoryTask) => {
  const currentString = isCurrent ? `&isCurrent=${isCurrent}` : "";
  const futureString = isFuture ? `&isFuture=${isFuture}` : "";
  const { data } = await api.get<CategoryModel[]>(
    `/category/task/?startTime=${startTime}&endTime=${endTime}` +
      currentString +
      futureString,
  );

  return data;
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
