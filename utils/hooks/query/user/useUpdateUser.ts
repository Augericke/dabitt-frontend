import userService, { UpdateUser } from "../../../services/user";
import { UserModel } from "../../../../types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const updateUser = async (updateData: UpdateUser) => {
  const updatedUser = await userService.update(updateData);
  return updatedUser;
};

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const queryKey = ["user"];
  const updateMutation = useMutation(
    (updatedUser: UpdateUser) => updateUser(updatedUser),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<UserModel>(queryKey, data);
      },
      onError: () => {
        toast.error(`We ran into an issue updating your profile.`, {
          id: "user",
        });
      },
    },
  );

  return updateMutation;
}
