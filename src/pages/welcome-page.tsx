import { useEffect, useState } from "react";
import LandingLayout from "../components/layouts/welcome-layout";
import styles from "../styles/welcome-page.module.css";
import { useNavigate } from "react-router-dom";
import LogoWelcome from "../assets/logo-welcome";

const WelcomePage = () => {
  const [pulse, setPulse] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      pulse && navigate("/home");
    }, 750);
  }, [pulse]);

  return (
    <>
      <LandingLayout>
        <div className={styles["landing-pitch"]}>
          <div className={styles["logo"]}>
            <span className={styles["logo-icon"]}>
              <LogoWelcome className={styles["check"]} />
            </span>

            <h1 className={styles["brand-name"]}>Dooit</h1>
          </div>

          <div className={styles["tagline"]}>
            <span>Write what you need to do.</span>
            <span>Everyday.</span>
          </div>
        </div>

        <button
          className={styles["button"]}
          style={
            pulse
              ? {
                  transform: "scale(100)",
                  bottom: "50%",
                }
              : {
                  bottom: "5%",
                }
          }
          onClick={() => setPulse(true)}
        >
          {!pulse && `Let's Go`}
        </button>
      </LandingLayout>
    </>
  );
};

export default WelcomePage;
