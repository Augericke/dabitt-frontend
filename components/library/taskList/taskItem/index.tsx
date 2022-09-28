/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useRef, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { api } from "../../../../utils/environmentManager";
import { TaskModel } from "../../../../types/task";

const styles = require("./taskItem.module.scss");

type TaskItemProps = {
  task: TaskModel;
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const [taskDescription, setTaskDescription] = useState(task.description);

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

  const updateTask = async () => {
    try {
      if (!isLoading && taskDescription !== task.description) {
        const token = await getAccessTokenSilently({
          audience: "API/dabitt",
          scope: "",
        });

        const dataConfig = {
          description: taskDescription,
        };

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
      <span className={styles.taskStatusIcon} />
      <textarea
        ref={textRef}
        className={styles.taskInput}
        placeholder="add task"
        value={taskDescription}
        onChange={onChangeHandler}
        onKeyDown={onEnterSubmit}
        onBlur={() => updateTask()}
        maxLength={140}
      />
    </li>
  );
};

export default TaskItem;
