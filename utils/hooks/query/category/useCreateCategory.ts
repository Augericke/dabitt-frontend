import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryService, { CreateCategory } from "../../../services/category";
import { CategoryModel } from "../../../../types/category";
import toast from "react-hot-toast";

const createCategory = async (data: CreateCategory) => {
  const addedCategory = await categoryService.create(data);
  return addedCategory;
};
export function useCreateCategory() {
  const queryClient = useQueryClient();

  const queryKey = ["categories"];
  const createMutation = useMutation(
    (newCategory: CreateCategory) => createCategory(newCategory),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<CategoryModel[] | undefined>(
          queryKey,
          (oldCategories) => oldCategories && [...oldCategories, data],
        );
      },
      onError: () => {
        toast(`We ran into an issue creating this category.`, {
          id: "category",
        });
      },
    },
  );

  return createMutation;
}
