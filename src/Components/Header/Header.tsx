
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import styles from "./Header.module.css";
import { logout } from "../../ReduxSlice/LoginSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>

        {/* Logo */}
        <Link to="/home" className={styles.logo}>
          <span className={styles.logoIcon}>🛒</span>
          <span>ShopList</span>
        </Link>

        {/* Navigation */}
        <nav className={styles.navigation}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Profile
          </NavLink>

          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </nav>

      </div>
    </header>
  );
};

export default Header;
