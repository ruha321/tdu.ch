import { NavLink } from "react-router-dom";
import styles from "../styles/Nav.module.css";

export function Nav() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.navLink}>
        トップページ
      </NavLink>
      <NavLink to="/bbs" className={styles.navLink}>
        掲示板へ
      </NavLink>
      <NavLink to="/bbs/threads" className={styles.navLink}>
        スレッド一覧
      </NavLink>
    </nav>
  );
}
