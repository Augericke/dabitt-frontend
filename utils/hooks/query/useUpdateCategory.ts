import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryService, { UpdateCategory } from "../../services/category";
import { CategoryModel } from "../../../types/category";

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
        console.log(updateMutation.error);
      },
    },
  );

  return updateMutation;
}
