import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import colorOptions from "../../../../styles/_selectableColors.module.scss";
import { displayHourMinutes, formatDate } from "../../../../utils/dateComputer";
import { WeekCompleted } from "../../../../types/analytics";
import _ from "lodash";
import { CategoryModel } from "../../../../types/category";
import { useWindowSize } from "../../../../utils/hooks/useWindowSize";

const styles = require("./bar.module.scss");

type BarChartProps = {
  data: WeekCompleted[];
  categories: CategoryModel[];
  selectedCategory?: CategoryModel;
};

const BarChart: React.FC<BarChartProps> = ({
  data,
  categories,
  selectedCategory,
}) => {
  const { width } = useWindowSize();

  //Filter data if category selected
  const filteredData = selectedCategory
    ? data.filter((category) => category.categoryId === selectedCategory.id)
    : data;

  // Format data so it plays nice with nivo
  const chartData = _(filteredData)
    .map((row) => {
      return { [row.categoryId]: Number(row.value), day: row.day.slice(0, 10) };
    })
    .value()
    .reduce((accumulator: any, current: any) => {
      let itemIndex = accumulator.findIndex(
        (item: any) => item.day === current.day,
      );
      if (itemIndex != -1) {
        accumulator[itemIndex] = { ...accumulator[itemIndex], ...current };
      } else {
        accumulator = accumulator.concat(current);
      }
      return accumulator;
    }, []);

  const chartKeys = categories.map((category) => category.id);
  const chartColors = categories.map(
    (category) =>
      colorOptions[`category-color-${category.iconColor}`.replace("_", "-")],
  );

  function findCategoryName(categoryId: string) {
    const category = categories.find((category) => category.id === categoryId);
    return category!.name;
  }

  return (
    <ResponsiveBar
      data={chartData}
      indexBy="day"
      keys={chartKeys}
      margin={{ top: 40, right: 60, bottom: 60, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      enableLabel={false}
      colors={chartColors}
      axisBottom={{ format: (value) => formatDate(value, "EEE") }}
      tooltip={(input) => {
        return (
          <div className={styles.barTooltip}>
            <span className={styles.barValue}>
              {displayHourMinutes(Number(input.value))}
            </span>
            &nbsp;of {findCategoryName(input.id as string)} tasks completed
          </div>
        );
      }}
      theme={{
        fontFamily: "Poppins",
        fontSize: 8,
        textColor: "white",
        axis: {
          ticks: {
            line: {
              stroke: colorOptions["subtle-color"],
            },
            text: {
              fill: colorOptions["text-color"],
              fontWeight: 100,
            },
          },
        },
        grid: {
          line: {
            stroke: colorOptions["subtle-color"],
            strokeWidth: 1,
          },
        },
      }}
      legendLabel={(data) => findCategoryName(data.id as string)}
      legends={[
        {
          toggleSerie: true,
          dataFrom: "keys",
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 50,
          itemsSpacing: 2,
          itemWidth: width > 750 ? 70 : 60,
          itemHeight: 20,
          itemDirection: "left-to-right",
          symbolSize: width > 750 ? 15 : 10,
          itemTextColor: colorOptions["text-color"],
        },
      ]}
    />
  );
};

export default BarChart;
