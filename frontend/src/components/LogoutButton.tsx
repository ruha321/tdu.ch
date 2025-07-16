import { useNavigate } from "react-router-dom";
import { signout } from "../logic/app_login";

import styles from "../styles/Header.module.css";

export function LogoutButton() {
  const navigate = useNavigate();
  const LogoutHandler = signout(() => navigate("/", { replace: true }));

  return (
    <div className={styles.Logout}>
      ;
      <button onClick={LogoutHandler} className={styles.LogoutButton}>
        ログアウト
      </button>
    </div>
  );
}
