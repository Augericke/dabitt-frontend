import { useQueries } from "@tanstack/react-query";
import { CategoryModel } from "../../../../types/category";
import { IconColors, TaskModel } from "../../../../types/task";
import taskService from "../../../services/task";
import _ from "lodash";

export function useTaskProgressBar(
  categories: CategoryModel[],
  selectedDate: Date,
) {
  const taskQueries = useQueries<TaskModel[]>({
    queries: categories.map((category) => {
      return {
        queryKey: ["tasks", category.id, selectedDate],
        queryFn: () => taskService.read(category.id, selectedDate),
        staleTime: Infinity,
      };
    }),
  });

  const isLoading = taskQueries.some((query) => query.isLoading);
  const isError = taskQueries.some((query) => query.isError);
  if (!isError && !isLoading) {
    // Combine all task data into a single array
    const queryData = taskQueries
      .map((query) => query.data)
      .flat(1) as TaskModel[];

    const aggregatedQueryData = _(queryData)
      .map((task) => {
        return { ...task, isComplete: task.completedAt !== null };
      })
      .groupBy((task) => {
        return `${task.categoryId}, ${task.isComplete}`;
      })
      .map((task) => ({
        categoryId: _.maxBy(task, "categoryId")?.categoryId,
        isComplete: _.maxBy(task, "isComplete")?.isComplete,
        value: _.sumBy(task, "estimateMinutes"),
      }))
      .value();

    // Merge Data to get category details
    const mergedData = aggregatedQueryData.map((item) => ({
      ...categories.find((cat) => cat.id === item.categoryId),
      ...item,
    }));

    // Select only relevant fields for ProgressBar component
    const chartData = mergedData.map(
      ({ categoryId, name, iconColor, isComplete, value }) => ({
        categoryId: categoryId as string,
        category: name as string,
        color: iconColor as IconColors,
        completed: isComplete as boolean,
        value,
      }),
    );

    return chartData;
  }
}
