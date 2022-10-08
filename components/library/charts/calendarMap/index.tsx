import React from "react";
import {
  ResponsiveTimeRange,
  TimeRange,
  CalendarTooltipProps,
} from "@nivo/calendar";
import variable from "../../../../styles/_selectableColors.module.scss";

const styles = require("./calendarMap.module.scss");

type CalenderMapProps = {};

const CalenderMap: React.FC<CalenderMapProps> = (props: CalenderMapProps) => {
  return (
    <div className={styles.chartContainer}>
      <TimeRange
        data={calData}
        height={250}
        width={650}
        from="2016-02-01"
        to="2016-7-31"
        theme={{
          textColor: variable["text-color"],
        }}
        emptyColor={variable["background-color"]}
        colors={colors}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        dayBorderWidth={0.5}
        daySpacing={5}
        dayBorderColor={colors[2]}
        tooltip={(input) => {
          console.log(input);
          return <span />;
        }}
      />
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

function addAlpha(color: string, opacity: number) {
  // coerce values so ti is between 0 and 1.
  var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}

const defaultColors = [
  variable["chart-color-lowest"],
  variable["chart-color-low"],
  variable["chart-color-medium"],
  variable["chart-color-high"],
  variable["chart-color-highest"],
];

const opacityRange = [0.1, 0.3, 0.5, 0.7, 1];
const colors = opacityRange.map((opacity) => {
  return addAlpha(variable["category-color-blush"], opacity);
});

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
