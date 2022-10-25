import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryService, { UpdateCategory } from "../../../services/category";
import { CategoryModel } from "../../../../types/category";
import toast from "react-hot-toast";

const updateCategory = async (updateData: UpdateCategory) => {
  const updatedCategory = await categoryService.update(updateData);
  return updatedCategory;
};

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  const queryKey = ["categories"];
  const updateMutation = useMutation(
    (updatedCategory: UpdateCategory) => updateCategory(updatedCategory),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<CategoryModel[]>(
          queryKey,
          (oldCategories) =>
            oldCategories &&
            oldCategories.map((category) =>
              category.id !== data.id ? category : data,
            ),
        );
      },
      onError: () => {
        toast(`We ran into an issue updating this category.`, {
          id: "category",
        });
      },
    },
  );

  return updateMutation;
}
