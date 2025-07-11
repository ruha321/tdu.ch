import {
  Link,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";
import type { Route } from "./+types/BBS";
import { useEffect } from "react";
import { useAuthContext } from "../logic/AuthProvider";
import { requireUser } from "../logic/auth";

export async function clientLoader(params: Route.ClientLoaderArgs) {
  const user = requireUser;
  if (user === null) {
    redirect("/login");
  }
  return user;
}

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "読み込み中..." }];
}

export default function BBS({ loaderData, params }: Route.ComponentProps) {
  //const { user } = useAuthContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  /*useEffect(() => {
    if (user === null) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);
  */
  useEffect(() => {
    if (pathname === "/bbs") {
      navigate("/bbs/main", { replace: true });
    }
  }, [pathname, navigate]);
  //if (!user) return null;
  return (
    <div>
      <h2>{}</h2>
      <ul>
        <li>
          <Link to="/bbs/threads">スレッド一覧</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
