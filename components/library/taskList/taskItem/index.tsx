import React, { useRef, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TickBox from "../../tickBox";
import Popover from "../../popover";
import { getMenuItems } from "./taskMenuOptions";
import { CategoryModel, IconColors, TaskModel } from "../../../../types/task";
import taskService from "../../../../utils/services/task";
import { getSelectableColorClass } from "../../../../utils/selectableColorClass";
import useFontFaceObserver from "use-font-face-observer";
import { displayHourMinutes } from "../../../../utils/dateComputer";

const styles = require("./taskItem.module.scss");

type TaskItemProps = {
  task: TaskModel;
  tasks: TaskModel[];
  setTasks: React.Dispatch<React.SetStateAction<TaskModel[]>>;
  categoryColor: IconColors;
};

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  tasks,
  setTasks,
  categoryColor,
}) => {
  // Requests
  const { getAccessTokenSilently } = useAuth0();

  // Text Area
  const { borderColor } = getSelectableColorClass(styles, categoryColor);
  const [taskDescription, setTaskDescription] = useState("loading...");
  const [checkSpelling, setCheckSpelling] = useState(false);

  // Time Estimate
  //TODO: write date function get display text with just minute input
  const [taskTimeEstimate, setTaskTimeEstimate] = useState(
    task.estimateMinutes,
  );

  // Tick Box
  const [isTicked, setIsTicked] = useState(task.completedAt != null);

  // Resize textArea based on description length
  const textRef = useRef<any>();
  const isFontListLoaded = useFontFaceObserver([{ family: `Poppins` }]);

  // Wait until fonts loaded before initial render so height matches
  useEffect(() => {
    if (isFontListLoaded) {
      setTaskDescription(task.description);
    }
  }, [isFontListLoaded, task.description]);

  useEffect(() => {
    textRef.current.style.height = "0px";
    const scrollHeight = textRef.current.scrollHeight;
    textRef.current.style.height = `${scrollHeight}px`;
  }, [taskDescription]);

  // Avoid users adding line breaks
  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskDescription(event.target.value.replace(/\n/g, ""));
  };

  // Only update and trim whitespace if there is a task description / task description has changed
  const onBlur = () => {
    const newDescription =
      taskDescription === "" ? task.description : taskDescription.trim();
    if (newDescription && newDescription !== task.description) {
      const updateDate = {
        description: taskDescription,
      };

      updateTask(updateDate);
    }

    setTaskDescription(newDescription);
    setCheckSpelling(false);
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

  const handleTimeChange = (newEstimate: number) => {
    const updateData = {
      estimateMinutes: newEstimate,
    };

    updateTask(updateData);
    setTaskTimeEstimate(newEstimate);
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
        id="textarea"
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
              {displayHourMinutes(taskTimeEstimate)}
            </span>
          }
          // Possible time estimate options
          menuItems={[15, 30, 60, 120].map((time) => {
            return {
              content: <span>{displayHourMinutes(time)}</span>,
              onClick: () => handleTimeChange(time),
            };
          })}
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
