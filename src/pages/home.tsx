import Logo from "../assets/logo";
import MainLayout from "../components/layouts/main-layout";
import Header from "../components/ui/header";
import styles from "../styles/home-page.module.css";
import useTaskStore from "../lib/task/store";
import TaskList from "../components/ui/task-list";
import TaskListEmpty from "../components/ui/task-list-empty";

const Home = () => {
  const { tasks } = useTaskStore();

  return (
    <>
      <MainLayout>
        <Header className={styles["header"]}>
          <Logo />
          <span className={styles["brand-name-header"]}>Dooit</span>
        </Header>

        <div className={styles["content"]}>
          {tasks.length > 0 ? <TaskList tasks={tasks} /> : <TaskListEmpty />}
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
