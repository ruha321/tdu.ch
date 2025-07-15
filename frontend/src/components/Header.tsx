import { Nav } from "./Nav";
import styles from "../styles/Header.module.css";
import { LogoutButton } from "./LogoutButton";
import { useContext } from "react";
import { AuthContext } from "../logic/AuthProvider";
import { Link } from "react-router-dom";

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <h1>
          <Link to="/" className={styles.logo}>
            tduch
          </Link>
        </h1>
      </div>
      <div className={styles.navContainer}>
        <Nav />
        <div className={styles.authButtons}>
          {user !== null ? (
            <LogoutButton />
          ) : (
            <>
              <Link to="/login" className={styles.loginLink}>
                ログイン
              </Link>
              <Link to="/signup" className={styles.signupLink}>
                サインアップ
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
