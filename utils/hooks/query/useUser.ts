import { useQuery } from "@tanstack/react-query";
import userService from "../../services/user";
import { UserModel } from "../../../types/user";

export function useUser() {
  const queryKey = ["user"];
  const query = useQuery<UserModel, Error>(queryKey, () => userService.read());

  return query;
}
