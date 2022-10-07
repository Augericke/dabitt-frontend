import { useQuery } from "@tanstack/react-query";
import categoryService, { RequestCategoryTask } from "../../services/category";
import { CategoryModel } from "../../../types/task";
import { startOfDay } from "date-fns";

export function useCategoryTasks({
  startTime,
  endTime,
  isCurrent,
  isFuture,
}: RequestCategoryTask) {
  const queryKey = ["category-tasks", startOfDay(new Date(startTime))];
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
