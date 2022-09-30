import { api } from "../environmentManager";
import { CategoryModel } from "../../types/task";

const create = async (data: { name: string }, headers: {}) => {
  const response = await api.post<CategoryModel>("/category", data, headers);
  return response.data;
};

const update = async (id: string, data: { name: string }, headers: {}) => {
  const response = await api.put(`/category/${id}`, data, headers);
  return response.data;
};

const destroy = async (id: string, headers: {}) => {
  const response = await api.delete(`/category/${id}`, headers);
  return response.data;
};

const categoryService = { create, update, destroy };

export default categoryService;
