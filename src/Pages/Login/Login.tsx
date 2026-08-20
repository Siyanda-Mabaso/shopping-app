import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <main className={styles.loginPage}>
      <div className={styles.loginCard}>

        <div className={styles.logo}>
           👜ShopList
        </div>

        <div className={styles.heading}>
          <h1>Welcome Back!</h1>
          <p>Login to manage your shopping lists.</p>
        </div>

        <form className={styles.form}>
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          <Button type="submit">
            Login
          </Button>
        </form>

        <div className={styles.register}>
          <p>
            Don't have an account?{" "}
            <Link to="/signup">
              Sign up here
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
};

export default Login;