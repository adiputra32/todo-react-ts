import EmptyTaskList from "../assets/empty-task-list";
import Logo from "../assets/logo";
import MainLayout from "../components/layouts/main-layout";
import Header from "../components/ui/header";
import styles from "../styles/home-page.module.css";
import Plus from "../assets/plus";
import { useNavigate } from "react-router-dom";
import useTaskStore from "../lib/task/store";
import { Task } from "../types/Task";
import { useState } from "react";
import PlusFloating from "../assets/plus-floating";
import Confirmation from "../components/ui/confirmation";

type TaskListProps = {
  tasks: Task[];
};

const Home = () => {
  const { tasks } = useTaskStore();
  console.log(tasks);

  const navigate = useNavigate();

  return (
    <>
      <MainLayout>
        <Header className={styles["header"]}>
          <Logo />
          <span className={styles["brand-name-header"]}>Dooit</span>
        </Header>

        <div className={styles["content"]}>
          {tasks.length > 0 ? (
            <>
              <TaskList tasks={tasks} />
              <button
                className={styles["button-new-list-floating"]}
                onClick={() => navigate("/new-list")}
              >
                <PlusFloating />
              </button>
            </>
          ) : (
            <EmptyList />
          )}
        </div>
      </MainLayout>
    </>
  );
};

const EmptyList = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles["empty-list"]}>
        <EmptyTaskList />

        <div className={styles["empty-list-description-wrapper"]}>
          <span className={styles["empty-list-description"]}>
            Create your first to-do list...
          </span>
          <button
            className={styles["button-new-list"]}
            onClick={() => navigate("/new-list")}
          >
            <Plus />
            New List
          </button>
        </div>
      </div>
    </>
  );
};

const TaskList = ({ tasks }: TaskListProps) => {
  const navigate = useNavigate();
  const { removeTask } = useTaskStore();
  const [removeConfirmation, setRemoveConfirmation] = useState<boolean>(false);
  const [removeId, setRemoveId] = useState<number | null>(null);

  const handleRemove = (key: number) => {
    setRemoveConfirmation(true);
    setRemoveId(key);
  };

  const closeConfirmation = () => {
    setRemoveConfirmation(false);
    setRemoveId(null);
  };

  const positiveBtnHandler = () => {
    if (removeId !== null) {
      removeTask(removeId);
      setRemoveConfirmation(false);
    }
  };

  return (
    <>
      <div className={styles["task-list-wrapper"]}>
        <div className={styles["task-list"]}>
          {tasks.map((value, key) => (
            <div
              key={key}
              className={styles["task-item"]}
              style={{ backgroundColor: value.color }}
            >
              <div
                className={styles["task-item-content"]}
                onClick={() => navigate(`/edit-list/${key}`)}
              >
                <span className={styles["task-item-title"]}>{value.title}</span>
                <span className={styles["task-item-label"]}>{value.label}</span>
              </div>
              <button
                className={`${styles["task-item-remove"]} ${
                  removeId === key && styles["active"]
                }`}
                onClick={() => handleRemove(key)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trash"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {removeConfirmation && (
        <Confirmation
          positiveBtnHandler={positiveBtnHandler}
          message="Deleting your data is irreversible. Confirm delete?"
          closeConfirmation={closeConfirmation}
        />
      )}
    </>
  );
};

export default Home;
