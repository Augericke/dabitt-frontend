import React from "react";
import { formatDate, getUTCDayRange } from "../../../utils/dateComputer";
import { motion, AnimatePresence } from "framer-motion";
import { add, sub } from "date-fns";

const styles = require("./limitedCalender.module.scss");

type LimitedCalenderProps = {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
};

const LimitedCalender: React.FC<LimitedCalenderProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const currentDate = new Date();
  return (
    <div className={styles.calenderContainer}>
      <h1 className={styles.calenderHeader}>
        {formatDate(selectedDate, "MMMM, yyyy")}
      </h1>
      <div className={styles.datesContainer}>
        <DateSelector
          dateObj={sub(currentDate, { days: 1 })}
          content="yesterday"
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <DateSelector
          dateObj={currentDate}
          content="today"
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <DateSelector
          dateObj={add(currentDate, { days: 1 })}
          content="tomorrow"
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
};

export default LimitedCalender;

type DateSelectorProps = {
  dateObj: Date;
  content: string;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
};
const DateSelector: React.FC<DateSelectorProps> = ({
  dateObj,
  content,
  selectedDate,
  setSelectedDate,
}) => {
  const isSelected = selectedDate.toDateString() === dateObj.toDateString();
  const selectedTimeSpan = getUTCDayRange(dateObj);

  return (
    <div
      className={
        isSelected ? styles.dateContainerSelected : styles.dateContainer
      }
      onClick={() => setSelectedDate(new Date(selectedTimeSpan.startTime))}
    >
      <AnimatePresence>
        <span>{formatDate(dateObj, "EEE")}</span>
        <span>{formatDate(dateObj, "d")}</span>
        {isSelected && (
          <motion.span
            id={content}
            key={content}
            className={styles.dayText}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};
