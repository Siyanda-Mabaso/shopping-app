import { Link } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./Header.module.css";

const Header = () => {
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

          <Button variant="secondary">
            Logout
          </Button>
        </nav>

      </div>
    </header>
  );
};

export default Header;