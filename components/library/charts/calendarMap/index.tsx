import React from "react";
import { ResponsiveTimeRange } from "@nivo/calendar";
import variable from "../../../../styles/_selectableColors.module.scss";

console.log();

const styles = require("./calendarMap.module.scss");

type CalenderMapProps = {};

const calData: any = [
  {
    day: "2016-07-21",
    value: 200,
  },
];

const CalenderMap: React.FC<CalenderMapProps> = (props: CalenderMapProps) => {
  return (
    <div style={{ width: "100%", height: "300px" }}>
      <ResponsiveTimeRange
        data={calData}
        from="2016-07-01"
        to="2016-09-29"
        emptyColor={variable["background-color"]}
        colors={[variable["category-color-default"]]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        dayBorderWidth={1}
        daySpacing={5}
        dayBorderColor={variable["category-color-default"]}
      />
    </div>
  );
};

export default CalenderMap;
