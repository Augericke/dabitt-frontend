import React, { useState } from "react";
import {
  formatDate,
  YesterdayTodayTomorrow,
} from "../../../utils/dateComputer";
import { isEqual } from "date-fns";

const styles = require("./limitedCalender.module.scss");

type LimitedCalenderProps = {
  dates: YesterdayTodayTomorrow;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
};

const LimitedCalender: React.FC<LimitedCalenderProps> = ({
  dates,
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <div className={styles.calenderContainer}>
      <h1 className={styles.calenderHeader}>
        {formatDate(selectedDate, "MMMM, yyyy")}
      </h1>
      <div className={styles.datesContainer}>
        <DateSelector
          dateObj={dates.yesterday}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <DateSelector
          dateObj={dates.today}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <DateSelector
          dateObj={dates.tomorrow}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
};

export default LimitedCalender;

type DateSelectorProps = {
  dateObj: { date: Date; text: String };
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
};
const DateSelector: React.FC<DateSelectorProps> = ({
  dateObj,
  selectedDate,
  setSelectedDate,
}) => {
  const isSelected = isEqual(selectedDate, dateObj.date);

  return (
    <div
      className={
        isSelected ? styles.dateContainerSelected : styles.dateContainer
      }
      onClick={() => setSelectedDate(dateObj.date)}
    >
      <span>{formatDate(dateObj.date, "EEE")}</span>
      <span>{formatDate(dateObj.date, "d")}</span>
      {isSelected && <span className={styles.dayText}>{dateObj.text}</span>}
    </div>
  );
};
