import { Link } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./Header.module.css";
import { logout } from "../../ReduxSlice/LoginSlice";
import { useNavigate } from "react-router-dom";



const Header = () => {
  const navigate = useNavigate();
  const handleLogout=() => {
    logout();
    navigate("/login");
  }
  return (
    <header className={styles.header}>
      <div className={styles.container}>

        <Link to="/home" className={styles.logo}>
          🛒 ShopList
        </Link>

        <nav className={styles.navigation}>
          <Link to="/home" className={styles.navLink}>
            Home
          </Link>

          <Link to="/profile" className={styles.navLink}>
            Profile
          </Link>

          <Button variant="secondary" onClick={handleLogout}   >
            Logout
          </Button>
        </nav>

      </div>
    </header>
  );
};

export default Header;