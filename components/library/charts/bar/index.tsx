import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import colorOptions from "../../../../styles/_selectableColors.module.scss";
import { displayHourMinutes, formatDate } from "../../../../utils/dateComputer";

const styles = require("./bar.module.scss");

type BarChartProps = {};

const BarChart: React.FC<BarChartProps> = (props: BarChartProps) => {
  return (
    <ResponsiveBar
      data={mockData}
      indexBy="day"
      keys={["work", "personal"]}
      margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      enableLabel={false}
      colors={[colorOptions["icon-color"], colorOptions["subtle-color"]]}
      axisBottom={{ format: (value) => formatDate(value, "EEE") }}
      tooltip={(input) => {
        return (
          <div className={styles.barTooltip}>
            <span className={styles.barValue}>
              {displayHourMinutes(Number(input.value))}
            </span>
            &nbsp;of {input.id} tasks completed
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
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          symbolSize: 15,
        },
      ]}
    />
  );
};

export default BarChart;

const mockData: any = [
  {
    day: "2016-07-01",
    personal: 30,
    work: 60,
  },
  {
    day: "2016-07-02",
    personal: 30,
    work: 60,
  },
  {
    day: "2016-07-03",
    personal: 30,
  },
  {
    day: "2016-07-04",
    personal: 50,
    work: 60,
  },
  {
    day: "2016-07-05",
    personal: 10,
    work: 60,
  },
  {
    day: "2016-07-06",
    personal: 20,
    work: 60,
  },
  {
    day: "2016-07-07",
    personal: 30,
    work: 60,
  },
];
