/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useRef, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { api } from "../../../../utils/environmentManager";
import TickBox from "../../tickBox";
import { TaskModel } from "../../../../types/task";

const styles = require("./taskItem.module.scss");

type TaskItemProps = {
  task: TaskModel;
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [isTicked, setIsTicked] = useState(task.completedAt != null);

  // Resize textArea based on description length
  const textRef = useRef<any>();
  useEffect(() => {
    textRef.current.style.height = "0px";
    const scrollHeight = textRef.current.scrollHeight;
    textRef.current.style.height = `${scrollHeight}px`;
  }, [taskDescription]);

  // Avoid users adding line breaks
  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskDescription(event.target.value.replace(/\n/g, ""));
  };

  // Force loss of focus on enter (triggers updateTask)
  const onEnterSubmit = (event: any) => {
    if (event.key === "Enter" && event.shiftKey == false) {
      event.target.blur();
    }
  };

  // Only update and trim whitespace if there is a task description / task description has changed
  const onBlur = () => {
    setTaskDescription(taskDescription.trim());

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
    let dataConfig = {};
    if (isTicked) {
      dataConfig = { completedAt: null };
    } else {
      dataConfig = { completedAt: new Date() };
    }

    updateTask(dataConfig);
    setIsTicked(!isTicked);
  };

  const updateTask = async (dataConfig: {}) => {
    try {
      if (!isLoading && taskDescription) {
        const token = await getAccessTokenSilently({
          audience: "API/dabitt",
          scope: "",
        });

        const headerConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await api.put<TaskModel>(`/task/${task.id}`, dataConfig, headerConfig);
      }
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
        value={taskDescription}
        onChange={onChangeHandler}
        onKeyDown={onEnterSubmit}
        onBlur={onBlur}
        maxLength={140}
      />
    </li>
  );
};

export default TaskItem;
