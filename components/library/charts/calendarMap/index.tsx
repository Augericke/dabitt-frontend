import React, { useState } from "react";
import { TimeRange } from "@nivo/calendar";
import colorOptions from "../../../../styles/_selectableColors.module.scss";
import Modal from "../../modal";
import { displayHourMinutes, formatDate } from "../../../../utils/dateComputer";
import { IconColors } from "../../../../types/task";
import { addAlpha, getCSSGlobal } from "../../../../utils/selectableColorClass";
import { CategoryModel } from "../../../../types/category";
import TaskList from "../../taskList";

const styles = require("./calendarMap.module.scss");

type CalenderMapProps = {
  categories: CategoryModel[];
  color: IconColors;
};

const CalenderMap: React.FC<CalenderMapProps> = ({ categories, color }) => {
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
        : colorOptions[`category-color-${color}`];
    return addAlpha(selectedColor, opacity);
  });

  // Modal handling
  const showDaysTask = (date: Date) => {
    setSelectedDate(date);
    setShowDayModal(true);
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.calendarContainer}>
        <TimeRange
          data={calData}
          height={230}
          width={823}
          from="2022-03-01"
          to="2022-10-31"
          theme={{
            textColor: colorOptions["text-color"],
          }}
          emptyColor={colorOptions["background-color"]}
          colors={colors}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          square={false}
          dayBorderWidth={0}
          daySpacing={5}
          dayRadius={2}
          dayBorderColor={colors[0]}
          tooltip={(input) => {
            return (
              <div className={styles.calendarTooltip}>
                <span className={styles.calendarValue}>
                  {displayHourMinutes(Number(input.value))}
                </span>
                &nbsp;of tasks completed
              </div>
            );
          }}
          onClick={(input) => {
            //@ts-ignore
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
            <div className={styles.modalBlocker} />
            <h1 className={styles.dayModalTitle}>
              {formatDate(selectedDate, "MMM e, yyyy")}
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

const calData: any = [
  {
    day: "2022-10-18",
    value: 822,
  },
];
