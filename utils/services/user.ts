import { api } from "../environmentManager";
import { UserModel } from "../../types/user";

export interface UpdateUser {
  username?: string;
  preferedTheme?: string;
  completedSetup?: boolean;
}

const read = async () => {
  const { data } = await api.get<UserModel>("/user");
  return data;
};

const update = async (props: UpdateUser) => {
  const response = await api.put(`/user`, props);
  return response.data;
};

const userService = { read, update };

export default userService;
