import { useQuery } from "@tanstack/react-query";
import categoryService from "../../services/category";
import { CategoryModel } from "../../../types/category";

export function useCategory(id?: string) {
  const queryKey = ["categories"];
  const query = useQuery<CategoryModel[], Error>(queryKey, () =>
    categoryService.read(id),
  );

  return query;
}
