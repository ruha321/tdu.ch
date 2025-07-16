import { Nav } from "./Nav";
import styles from "../styles/Header.module.css";
import { LogoutButton } from "./LogoutButton";
import { useAuthContext } from "../logic/AuthProvider";
import { Link } from "react-router-dom";

function Header() {
  const { user } = useAuthContext();

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <h1>
          <Link to="/" className={styles.logo}>
            tduch
          </Link>
        </h1>
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
      <div className={styles.navInner}>
        <Nav />
      </div>
    </header>
  );
}

export default Header;
