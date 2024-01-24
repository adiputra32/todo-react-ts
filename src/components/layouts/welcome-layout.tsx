import styles from "../../styles/welcome-layout.module.css";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const WelcomeLayout = ({ children }: Props) => {
  return (
    <>
      <div className={styles["welcome-layout"]}>{children}</div>
    </>
  );
};

export default WelcomeLayout;
