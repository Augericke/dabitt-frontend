import { useQuery } from "@tanstack/react-query";
import categoryService, { RequestCategoryTask } from "../../services/category";
import { CategoryModel } from "../../../types/task";

export function useCategoryTasks({
  startTime,
  endTime,
  isCurrent,
  isFuture,
}: RequestCategoryTask) {
  const queryKey = ["category-tasks", startTime, endTime];
  const query = useQuery<CategoryModel[], Error>(queryKey, () =>
    categoryService.read({
      startTime,
      endTime,
      isCurrent,
      isFuture,
    }),
  );

  return query;
}
