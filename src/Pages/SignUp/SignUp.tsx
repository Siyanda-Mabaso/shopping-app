import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import styles from "./SignUp.module.css";

const SignUp = () => {
  return (
    <main className={styles.signUpPage}>
      <div className={styles.signUpCard}>

        <div className={styles.logo}>
          🛒 ShopList
        </div>

        <div className={styles.heading}>
          <h1>Create Account</h1>
          <p>Create an account to manage your shopping lists.</p>
        </div>

        <form className={styles.form}>
          <Input
            id="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
          />

          <Input
            id="surname"
            label="Surname"
            type="text"
            placeholder="Enter your surname"
          />

          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
          />

          <Input
            id="cellNumber"
            label="Cell Number"
            type="tel"
            placeholder="Enter your cell number"
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Create a password"
          />

          <Button type="submit">
            Sign Up
          </Button>
        </form>

        <div className={styles.loginLink}>
          <p>
            Already have an account?{" "}
            <Link to="/login">
              Login here
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
};

export default SignUp;