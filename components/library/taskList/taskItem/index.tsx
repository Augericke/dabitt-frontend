import React, { useRef, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TickBox from "../../tickBox";
import Popover from "../../popover";
import { getMenuItems } from "./taskMenuOptions";
import { CategoryModel, IconColors, TaskModel } from "../../../../types/task";
import taskService from "../../../../utils/services/task";
import { getSelectableColorClass } from "../../../../utils/selectableColorClass";

const styles = require("./taskItem.module.scss");

type TaskItemProps = {
  category: CategoryModel;
  task: TaskModel;
  tasks: TaskModel[];
  setTasks: React.Dispatch<React.SetStateAction<TaskModel[]>>;
  categoryColor: IconColors;
};

const TaskItem: React.FC<TaskItemProps> = ({
  category,
  task,
  tasks,
  setTasks,
  categoryColor,
}) => {
  // Requests
  const { getAccessTokenSilently } = useAuth0();

  // Text Area
  const { borderColor } = getSelectableColorClass(styles, categoryColor);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [checkSpelling, setCheckSpelling] = useState(false);

  // Time Estimate
  //TODO: write date function get display text with just minute input
  const [taskTimeEstimate, setTaskTimeEstimate] = useState({
    displayText:
      task.estimateMinutes < 60
        ? `${task.estimateMinutes} minutes`
        : task.estimateMinutes === 60
        ? "1 hour"
        : `${task.estimateMinutes / 60} hours`,
    minutes: task.estimateMinutes,
  });

  // Tick Box
  const [isTicked, setIsTicked] = useState(task.completedAt != null);

  // Resize textArea based on description length
  const textRef = useRef<any>();
  useEffect(() => {
    textRef.current.style.height = "1px";
    const scrollHeight = textRef.current.scrollHeight;
    textRef.current.style.height = `${scrollHeight}px`;
  }, [taskDescription]);

  // Avoid users adding line breaks
  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskDescription(event.target.value.replace(/\n/g, ""));
  };

  // Only update and trim whitespace if there is a task description / task description has changed
  const onBlur = () => {
    setTaskDescription(taskDescription.trim());
    setCheckSpelling(false);

    if (!taskDescription || taskDescription === task.description) {
      setTaskDescription(task.description);
    } else {
      const updateDate = {
        description: taskDescription,
      };

      updateTask(updateDate);
    }
  };

  const handleTickBox = () => {
    let updateData = {};
    if (isTicked) {
      updateData = { completedAt: null };
    } else {
      updateData = { completedAt: new Date() };
    }

    updateTask(updateData);
    setIsTicked(!isTicked);
  };

  const handleTimeChange = (newTime: {
    displayText: string;
    minutes: number;
  }) => {
    const updateData = {
      estimateMinutes: newTime.minutes,
    };

    updateTask(updateData);
    setTaskTimeEstimate(newTime);
  };

  const updateTask = async (updateData: {}) => {
    try {
      if (taskDescription) {
        const token = await getAccessTokenSilently({
          audience: "API/dabitt",
          scope: "",
        });

        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await taskService.update(task.id, updateData, header);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: "API/dabitt",
        scope: "",
      });

      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const updatedTasks = tasks.filter((tasks) => tasks.id != task.id);
      await taskService.destroy(task.id, header);
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className={styles.taskItem}>
      <TickBox
        isTicked={isTicked}
        onClick={handleTickBox}
        categoryColor={categoryColor}
      />
      <textarea
        ref={textRef}
        className={`${styles.taskInput} ${borderColor}`}
        placeholder="add task"
        spellCheck={checkSpelling}
        value={taskDescription}
        onChange={onChangeHandler}
        onKeyDown={onEnterSubmit}
        onFocus={() => setCheckSpelling(true)}
        onBlur={onBlur}
        maxLength={140}
      />
      <div className={styles.taskTimeEstimateContainer}>
        <Popover
          iconType="clock"
          iconText={
            <span className={styles.estimateLabel}>
              {taskTimeEstimate.displayText}
            </span>
          }
          menuItems={[
            {
              content: <span>15 minutes</span>,
              onClick: () =>
                handleTimeChange({
                  displayText: "15 minutes",
                  minutes: 15,
                }),
            },
            {
              content: <span>30 minutes</span>,
              onClick: () =>
                handleTimeChange({
                  displayText: "30 minutes",
                  minutes: 30,
                }),
            },
            {
              content: <span>1 hour</span>,
              onClick: () =>
                handleTimeChange({
                  displayText: "1 hour",
                  minutes: 60,
                }),
            },
            {
              content: <span>2 hour</span>,
              onClick: () =>
                handleTimeChange({
                  displayText: "2 hours",
                  minutes: 120,
                }),
            },
          ]}
        />
      </div>
      <span className={styles.popoverContainer}>
        <Popover menuItems={getMenuItems(textRef, deleteTask)} />
      </span>
    </li>
  );
};

export default TaskItem;

// Force loss of focus on enter (triggers updateTask)
const onEnterSubmit = (event: any) => {
  if (event.key === "Enter" && event.shiftKey == false) {
    event.target.blur();
  }
};
