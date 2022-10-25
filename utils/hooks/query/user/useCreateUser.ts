import userService, { CreateUser } from "../../../services/user";
import { UserModel } from "../../../../types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const createUser = async (newUserData: CreateUser) => {
  const updatedUser = await userService.create(newUserData);
  return updatedUser;
};

export function useCreateUser() {
  const queryClient = useQueryClient();

  const queryKey = ["user"];
  const createMutation = useMutation(
    (updatedUser: CreateUser) => createUser(updatedUser),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<UserModel>(queryKey, data);
      },
      onError: () => {
        toast.error(`We ran into an issue creating your profile.`, {
          id: "user",
        });
      },
    },
  );

  return createMutation;
}
