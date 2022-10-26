import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import colorOptions from "../../../../styles/_selectableColors.module.scss";
import { displayHourMinutes, formatDate } from "../../../../utils/dateComputer";
import { useWindowSize } from "../../../../utils/hooks/useWindowSize";

const styles = require("./bar.module.scss");

type BarChartDemoProps = {};

const BarChartDemo: React.FC<BarChartDemoProps> = () => {
  function randomNumber(range?: number) {
    return Math.floor(Math.random() * (range || 200));
  }

  const [randomNum, setRandomNum] = useState(randomNumber());

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomNum(randomNumber());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const mockData: any = [
    {
      day: "2016-07-01",
      personal: randomNum,
      work: randomNumber(100),
    },
    {
      day: "2016-07-02",
      personal: randomNumber(150),
      work: randomNumber(150),
    },
    {
      day: "2016-07-03",
      personal: randomNumber(150),
      work: randomNumber(150),
    },
    {
      day: "2016-07-04",
      personal: randomNumber(),
      work: randomNumber(),
    },
    {
      day: "2016-07-05",
      personal: randomNumber(250),
      work: randomNumber(250),
    },
    {
      day: "2016-07-06",
      personal: randomNumber(),
      work: randomNumber(),
    },
    {
      day: "2016-07-07",
      personal: randomNumber(225),
      work: randomNumber(2),
    },
  ];

  return (
    <ResponsiveBar
      data={mockData}
      indexBy="day"
      keys={["work", "personal"]}
      margin={{
        top: 40,
        right: 10,
        bottom: 60,
        left: 10,
      }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      enableLabel={false}
      colors={[colorOptions["icon-color"], colorOptions["background-color"]]}
      axisBottom={{
        // Get day of week ignoring timezone since only a date string is being passed (i.e '2022-01-31' -> Mon)
        format: (value) =>
          formatDate(
            new Date(
              new Date(value).valueOf() +
                new Date(value).getTimezoneOffset() * 60 * 1000,
            ),
            "EEE",
          ),
      }}
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
        legends: {
          text: {
            fontWeight: 200,
          },
        },
        axis: {
          ticks: {
            line: {
              stroke: colorOptions["foreground-color"],
            },
            text: {
              fill: "white",
              fontWeight: 400,
            },
          },
        },
        grid: {
          line: {
            stroke: colorOptions["foreground-color"],
            strokeWidth: 1,
          },
        },
      }}
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
          itemWidth: 70,
          itemHeight: 20,
          itemDirection: "left-to-right",
          symbolSize: 15,
          itemTextColor: "white",
        },
      ]}
    />
  );
};

export default BarChartDemo;
