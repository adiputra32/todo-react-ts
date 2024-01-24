import HomeLayout from "../components/layouts/main-layout";
import Header from "../components/ui/header";
import styles from "../styles/list-page.module.css";
import LeftArrow from "../assets/left-arrow";
import TaskForm from "../components/ui/task-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useTaskStore from "../lib/task/store";
import { Task } from "../types/Task";
import generateRandomColor from "../lib/generate-random-color";
import Confirmation from "../components/ui/confirmation";

const NewList = () => {
  const navigate = useNavigate();
  const { addTask } = useTaskStore();
  const [isElementVisible, setIsElementVisible] = useState<boolean>(false);
  const [removeConfirmation, setRemoveConfirmation] = useState<boolean>(false);
  const createTaskForm = useForm<Task>({
    defaultValues: {
      details: [],
    },
  });

  const createTask = createTaskForm.handleSubmit(async (payload) => {
    if (payload.title && payload.label) {
      payload.color = generateRandomColor();
      addTask(payload);
      navigate("/home");
    } else {
      setRemoveConfirmation(true);
    }
  });

  const closeConfirmation = () => {
    setRemoveConfirmation(false);
  };

  const openConfirmation = () => {
    const { title, label, color, details } = createTaskForm.getValues();

    if (
      title === undefined &&
      label === undefined &&
      color === undefined &&
      details.length === 0
    ) {
      navigate("/home");
    } else {
      createTask();
    }
  };

  return (
    <>
      <HomeLayout>
        <Header className={styles["header"]}>
          <>
            <button
              className={styles["button-back"]}
              onClick={openConfirmation}
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
              {createTaskForm.watch("title") ?? "Title"}
            </span>
          </>
        </Header>

        <TaskForm
          setIsElementVisible={setIsElementVisible}
          styles={styles}
          taskForm={createTaskForm}
        />
      </HomeLayout>

      {removeConfirmation && (
        <Confirmation
          positiveBtnHandler={() => navigate("/home")}
          message="Incomplete form data will be lost. Confirm exit?"
          closeConfirmation={closeConfirmation}
        />
      )}
    </>
  );
};

export default NewList;
