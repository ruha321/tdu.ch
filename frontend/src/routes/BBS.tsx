import { Outlet, redirect, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { requireUser } from "../logic/auth";
import styles from "../styles/BBS.module.css";

export const main = "main";

export async function clientLoader() {
  const user = await requireUser();
  if (!user) {
    alert("ログインしてください");
    return redirect("/login");
  }
  return;
}

export function meta() {
  return [{ title: "読み込み中..." }];
}

export default function BBS() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/bbs") {
      navigate("/bbs/" + main, { replace: true });
    }
  }, [pathname, navigate]);
  return (
    <div className={styles.pageContent}>
      <Outlet />
    </div>
  );
}
