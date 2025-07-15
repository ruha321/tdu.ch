import {
  Link,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";
import type { Route } from "./+types/BBS";
import { useEffect } from "react";
import { requireUser } from "../logic/auth";
import styles from "../styles/BBS.module.css";

export const main = "main";

export async function clientLoader(params: Route.ClientLoaderArgs) {
  const user = await requireUser();
  return user;
}

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "読み込み中..." }];
}

export default function BBS({ loaderData, params }: Route.ComponentProps) {
  const user = loaderData;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  /*useEffect(() => {
    if (user === null) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);
  */
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
    if (pathname === "/bbs") {
      navigate("/bbs/" + main, { replace: true });
    }
  }, [pathname, navigate]);
  //if (!user) return null;
  return (
    <div className={styles.pageContent}>
      <Outlet />
    </div>
  );
}
