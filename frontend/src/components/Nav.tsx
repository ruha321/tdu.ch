import { NavLink } from "react-router-dom";
import styles from "../styles/Nav.module.css";
import { useAuthContext } from "../logic/AuthProvider";

export function Nav() {
  const { user } = useAuthContext();
  return (
    <nav className={styles.navLinks}>
      <div className={styles.navContainer}>
        <NavLink to="/" className={styles.navLink}>
          トップページ
        </NavLink>
        {user && (
          <>
            <NavLink to="/bbs" className={styles.navLink}>
              掲示板へ
            </NavLink>
            <NavLink to="/bbs/threads" className={styles.navLink}>
              スレッド一覧
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
