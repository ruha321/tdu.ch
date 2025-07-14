import { useNavigate } from "react-router-dom";
import styles from "../styles/Logout.module.css";
import { signout } from "../logic/app_login";

export function LogoutButton() {
  const navigate = useNavigate();
  const LogoutHandler = signout(() => navigate("/", { replace: true }));

  return (
    <div className={styles.Logout}>
      <button onClick={LogoutHandler} className={styles.LogoutButton}>
        ログアウト
      </button>
    </div>
  );
}
