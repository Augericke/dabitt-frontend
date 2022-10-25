import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryService from "../../../services/category";
import { CategoryModel } from "../../../../types/category";
import toast from "react-hot-toast";

const deleteCategory = async (id: string) => {
  const deletedCategory = await categoryService.destroy(id);
  return deletedCategory;
};

export function useDeleteCategory(categoryId: string) {
  const queryClient = useQueryClient();

  const queryKey = ["categories"];
  const deleteMutation = useMutation((id: string) => deleteCategory(id), {
    onSuccess: () => {
      queryClient.setQueryData<CategoryModel[]>(
        queryKey,
        (oldCategories) =>
          oldCategories &&
          oldCategories.filter((oldCategory) => oldCategory.id !== categoryId),
      );
    },
    onError: () => {
      toast(`We ran into an issue deleting this category.`, { id: "category" });
    },
  });

  return deleteMutation;
}
