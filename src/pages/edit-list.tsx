import HomeLayout from "../components/layouts/main-layout";
import Header from "../components/ui/header";
import styles from "../styles/new-list-page.module.css";
import LeftArrow from "../assets/left-arrow";
import TaskForm from "../components/ui/task-form";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useTaskStore from "../lib/task/store";
import { Task } from "../types/Task";
import generateRandomColor from "../lib/generate-random-color";

const EditList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask } = useTaskStore();
  const [isElementVisible, setIsElementVisible] = useState<boolean>(false);

  const taskId = id ? parseInt(id, 10) : undefined;
  const createtaskDefaultValue: Task | undefined =
    taskId != undefined ? tasks[taskId] : undefined;

  const editTaskForm = useForm<Task>({
    defaultValues: {
      title: createtaskDefaultValue?.title,
      label: createtaskDefaultValue?.label,
      color: createtaskDefaultValue?.color,
      details: createtaskDefaultValue?.details ?? [],
    },
  });

  const handleUpdateTask = editTaskForm.handleSubmit(async (payload) => {
    console.log(taskId, payload);

    if (payload.title && payload.label && taskId !== undefined) {
      payload.color = generateRandomColor();
      updateTask(taskId, payload);
    }

    navigate("/home");
  });

  return (
    <>
      <HomeLayout>
        <Header className={styles["header"]}>
          <>
            <button
              className={styles["button-back"]}
              onClick={handleUpdateTask}
            >
              <LeftArrow />
            </button>

            <span
              className={styles["input-title-header"]}
              style={{
                opacity: !isElementVisible ? "100" : "0",
                transform: !isElementVisible ? "scale(100%)" : "scale(95%)",
              }}
            >
              {editTaskForm.watch("title")}
            </span>
          </>
        </Header>

        <TaskForm
          setIsElementVisible={setIsElementVisible}
          styles={styles}
          taskForm={editTaskForm}
        />
      </HomeLayout>
    </>
  );
};

export default EditList;
