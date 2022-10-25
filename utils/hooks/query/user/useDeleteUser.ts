import userService from "../../../services/user";
import { UserModel } from "../../../../types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { baseUrl } from "../../../environmentManager";
import toast from "react-hot-toast";

const deleteUser = async () => {
  const deletedUser = await userService.destroy();
  return deletedUser;
};

const clearCacheData = () => {
  caches.keys().then((names) => {
    names.forEach((name) => {
      caches.delete(name);
    });
  });
};

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { logout } = useAuth0();

  const queryKey = ["user"];
  const deleteMutation = useMutation(() => deleteUser(), {
    onSuccess: () => {
      queryClient.setQueryData<UserModel[] | undefined>(queryKey, undefined);
      queryClient.clear();
      clearCacheData();
      logout({ returnTo: baseUrl });
    },
    onError: () => {
      toast.error(`We ran into an issue deleting your profile.`, {
        id: "user",
      });
    },
  });

  return deleteMutation;
}
