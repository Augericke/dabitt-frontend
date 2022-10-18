import React from "react";
import { TimeRange } from "@nivo/calendar";
import colorOptions from "../../../../styles/_selectableColors.module.scss";
import { displayHourMinutes } from "../../../../utils/dateComputer";
import { IconColors } from "../../../../types/task";
import { addAlpha, getCSSGlobal } from "../../../../utils/selectableColorClass";

const styles = require("./calendarMap.module.scss");

type CalenderMapProps = {
  color: IconColors;
};

const CalenderMap: React.FC<CalenderMapProps> = ({ color }) => {
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

  return (
    <div className={styles.chartContainer}>
      <div className={styles.calendarContainer}>
        <TimeRange
          data={calData}
          height={230}
          width={823}
          from="2016-01-01"
          to="2016-7-31"
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
                </span>{" "}
                of tasks completed
              </div>
            );
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
    </div>
  );
};

export default CalenderMap;

const calData: any = [
  {
    day: "2016-07-18",
    value: 822,
  },
  {
    day: "2016-07-19",
    value: 130,
  },
  {
    day: "2016-07-20",
    value: 452,
  },
  {
    day: "2016-07-21",
    value: 200,
  },
  {
    day: "2016-07-22",
    value: 100,
  },
  {
    day: "2016-07-23",
    value: 400,
  },
  {
    day: "2016-07-24",
    value: 15,
  },
  {
    day: "2016-07-25",
    value: 220,
  },
];
