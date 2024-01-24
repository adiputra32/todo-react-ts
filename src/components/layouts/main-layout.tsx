import styles from "../../styles/main-layout.module.css";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <div className={styles["main-layout"]}>{children}</div>
    </>
  );
};

export default MainLayout;
