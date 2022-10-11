import { api } from "../environmentManager";
import { ThemeColors, UserModel } from "../../types/user";

export interface CreateUser {
  username: string;
  preferedTheme?: ThemeColors;
  completedSetup?: boolean;
}
export interface UpdateUser {
  username?: string;
  preferedTheme?: ThemeColors;
  completedSetup?: boolean;
}

const create = async (data: CreateUser) => {
  const response = await api.post<UserModel>("/user", data);
  return response.data;
};

const read = async () => {
  const { data } = await api.get<UserModel>("/user");
  return data;
};

const update = async (props: UpdateUser) => {
  const response = await api.put(`/user`, props);
  return response.data;
};

const userService = { create, read, update };

export default userService;
