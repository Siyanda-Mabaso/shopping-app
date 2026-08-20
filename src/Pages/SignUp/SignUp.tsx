import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import styles from "./SignUp.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../Store/store";

import {
setName,
setSurname,
setNumber,
setEmail,
setPassword,
// setConfirmPassword,
signup,
resetForm,
} from "../../Store/SignUp";




const SignUp = () => {

  const dispatch = useDispatch<AppDispatch>();

  const signUpData = useSelector((state: RootState) => state.signUp);
  console.log(signUpData.email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
  await dispatch(signup(signUpData)).unwrap();

  dispatch(resetForm());
  } catch (error) {
  console.error("Signup failed:", error);
  }
  }


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

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            id="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={signUpData.name}
            onChange={(e) => dispatch(setName(e.target.value))}
          />

          <Input
            id="surname"
            label="Surname"
            type="text"
            placeholder="Enter your surname"
            value={signUpData.surname}
            onChange={(e) => dispatch(setSurname(e.target.value))}  
          />

          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={signUpData.email}
            onChange={(e) => dispatch(setEmail(e.target.value))}  
          />

          <Input
            id="cellNumber"
            label="Cell Number"
            type="tel"
            placeholder="Enter your cell number"
            value={signUpData.number}
            onChange={(e) => dispatch(setNumber(e.target.value))}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Create a password"
            value={signUpData.password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
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