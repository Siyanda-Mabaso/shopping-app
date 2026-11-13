import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <main className={styles.landingPage}>
      <div className={styles.buttons}>
        <Link to="/signup" className={styles.signupButton}>
          Sign Up
        </Link>

        <Link to="/login" className={styles.loginButton}>
          Login
        </Link>
      </div>
    </main>
  );
};

export default LandingPage;