import { api } from "../environmentManager";
import { IconColors } from "../../types/task";
import { CategoryModel } from "../../types/category";

export interface CreateCategory {
  name: string;
  iconColor?: IconColors;
}
export interface UpdateCategory {
  id: string;
  data: {
    name?: string;
    iconColor?: IconColors;
  };
}

const create = async (data: CreateCategory) => {
  const response = await api.post<CategoryModel>("/category", data);
  return response.data;
};

const read = async (id?: string) => {
  const { data } = await api.get<CategoryModel[]>(`/category/${id || ""}`);
  return data;
};

const update = async ({ id, data }: UpdateCategory) => {
  const response = await api.put(`/category/${id}`, data);
  return response.data;
};

const destroy = async (id: string) => {
  const response = await api.delete(`/category/${id}`);
  return response.data;
};

const categoryService = { create, read, update, destroy };

export default categoryService;
