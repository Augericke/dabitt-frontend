import React, { useState } from "react";
import { TimeRange, TimeRangeDayData } from "@nivo/calendar";
import colorOptions from "../../../../styles/_selectableColors.module.scss";
import Modal from "../../modal";
import { displayHourMinutes, formatDate } from "../../../../utils/dateComputer";
import { IconColors } from "../../../../types/task";
import { addAlpha, getCSSGlobal } from "../../../../utils/selectableColorClass";
import { CategoryModel } from "../../../../types/category";
import TaskList from "../../taskList";
import { CalendarCompleted } from "../../../../types/analytics";
import { sub } from "date-fns";
import { useWindowSize } from "../../../../utils/hooks/useWindowSize";

const styles = require("./calendarMap.module.scss");

type CalenderMapProps = {
  data: CalendarCompleted[];
  categories: CategoryModel[];
  color: IconColors;
};

type TimeRangeCalenderData = TimeRangeDayData & {
  date: Date;
  value?: number;
};

const CalenderMap: React.FC<CalenderMapProps> = ({
  data,
  categories,
  color,
}) => {
  const { width } = useWindowSize();
  const [showDayModal, setShowDayModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Color handling
  const opacityRange = [0.1, 0.3, 0.5, 0.7, 1];
  const colors = opacityRange.map((opacity) => {
    const selectedColor =
      color === "default"
        ? getCSSGlobal("--icon-color")
        : color === "default_secondary"
        ? getCSSGlobal("--subtle-color")
        : colorOptions[`category-color-${color}`.replace("_", "-")];
    return addAlpha(selectedColor, opacity);
  });

  // Modal handling
  const showDaysTask = (date: Date) => {
    setSelectedDate(date);
    setShowDayModal(true);
  };

  // Format data to play nice with nivo
  const chartData = data.map((item) => {
    const day = item.day.slice(0, 10);
    const value = Number(item.value);
    return { day, value };
  });

  return (
    <div className={styles.chartContainer}>
      <div className={styles.calendarContainer}>
        <TimeRange
          data={chartData}
          height={230}
          width={823}
          from={sub(new Date(), { days: 182 })}
          to={new Date()}
          theme={{
            textColor: colorOptions["text-color"],
          }}
          emptyColor={colorOptions["background-color"]}
          colors={colors}
          margin={{
            top: 40,
            right: 40,
            bottom: 40,
            left: width > 1400 ? 80 : 140,
          }}
          square={true}
          dayBorderWidth={0}
          daySpacing={5}
          dayRadius={2}
          dayBorderColor={colors[0]}
          tooltip={(input) => {
            const dateArray = input.day
              .split("-")
              .map((date) => parseInt(date));
            return (
              <div className={styles.calendarTooltip}>
                <span className={styles.calendarValue}>
                  {displayHourMinutes(Number(input.value))}
                </span>
                {` of ${
                  categories.length === 1 ? categories[0].name : ""
                } tasks completed on ${formatDate(
                  new Date(dateArray[0], dateArray[1] - 1, dateArray[2]),
                  "MMM, do",
                )}`}
              </div>
            );
          }}
          onClick={(input: TimeRangeCalenderData) => {
            if (input.value) {
              showDaysTask(input.date);
            }
          }}
        />
      </div>
      <div className={styles.legendContainer}>
        less
        {colors.map((color) => {
          return (
            <span
              key={color}
              className={styles.legendBox}
              style={{ backgroundColor: color }}
            />
          );
        })}
        more
      </div>
      <Modal
        isVisible={showDayModal}
        content={
          <div className={styles.daysModalContainer}>
            <h1 className={styles.dayModalTitle}>
              {formatDate(selectedDate, "MMM do, yyyy")}
            </h1>
            {categories && (
              <div className={styles.dayContainer}>
                {categories.map((category) => {
                  return (
                    <TaskList
                      key={category.id}
                      selectedDate={selectedDate}
                      category={category}
                      modifiable={false}
                    />
                  );
                })}
              </div>
            )}
          </div>
        }
        onClose={() => setShowDayModal(false)}
      />
    </div>
  );
};

export default CalenderMap;
