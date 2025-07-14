import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthProvider } from "../logic/AuthProvider";
import styles from "../styles/BodyLayout.module.css";

export default function BodyLayout() {
  return (
    <AuthProvider>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </AuthProvider>
  );
}
