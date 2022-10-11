import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryService, { CreateCategory } from "../../../services/category";
import { CategoryModel } from "../../../../types/category";

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
        console.log(createMutation.error);
      },
    },
  );

  return createMutation;
}
