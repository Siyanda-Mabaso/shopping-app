import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../Store/store";
import { loginThunk } from "../../ReduxSlice/LoginSlice";
import { useNavigate } from "react-router-dom";
import { setEmail, setPassword } from "../../ReduxSlice/SignUp";



const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const {  isLoading, error } = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();
  

  const email = useSelector((state: RootState) => state.signUp.email);
  const password = useSelector ((state:RootState)=> state.signUp.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const credentials = await dispatch(loginThunk({ email, password }))
    if (loginThunk.fulfilled.match(credentials)) {
      // alert("Login successful:");
      navigate("/home");
    }
    if (loginThunk.rejected.match(credentials)) {
      alert(credentials.payload as string || "Login failed");
    }
  }

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

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
              value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}

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