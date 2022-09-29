import { api } from "../environmentManager";

const update = async (id: string, data: { name: string }, headers: {}) => {
  const response = await api.put(`/category/${id}`, data, headers);
  return response.data;
};

const categoryService = { update };

export default categoryService;
