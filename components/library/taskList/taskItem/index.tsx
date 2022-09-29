import React, { useRef, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TickBox from "../../tickBox";
import Popover from "../../popover";
import { getMenuItems } from "./taskMenuOptions";
import { TaskModel } from "../../../../types/task";
import taskService from "../../../../utils/services/task";

const styles = require("./taskItem.module.scss");

type TaskItemProps = {
  task: TaskModel;
  tasks: TaskModel[];
  setTasks: React.Dispatch<React.SetStateAction<TaskModel[]>>;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, tasks, setTasks }) => {
  // Requests
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const [header, setHeader] = useState({});

  // Text Area
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [checkSpelling, setCheckSpelling] = useState(false);

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
      const dataConfig = {
        description: taskDescription,
      };

      updateTask(dataConfig);
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
      <TickBox isTicked={isTicked} onClick={handleTickBox} />
      <textarea
        ref={textRef}
        className={styles.taskInput}
        placeholder="add task"
        spellCheck={checkSpelling}
        value={taskDescription}
        onChange={onChangeHandler}
        onKeyDown={onEnterSubmit}
        onFocus={() => setCheckSpelling(true)}
        onBlur={onBlur}
        maxLength={140}
      />
      <Popover menuItems={getMenuItems(textRef, deleteTask)} />
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
