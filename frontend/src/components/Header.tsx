import { Nav } from "./Nav";
import styles from "../styles/Header.module.css";
import { LogoutButton } from "./LogoutButton";
import { useContext } from "react";
import { AuthContext } from "../logic/AuthProvider";

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h1>tduch</h1>
        <Nav />
        {user && <LogoutButton />}
      </div>
    </header>
  );
}

export default Header;
