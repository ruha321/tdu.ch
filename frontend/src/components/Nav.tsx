import { NavLink } from "react-router-dom";
import { useAuthContext } from "../logic/AuthProvider";

export function Nav() {
  const { user } = useAuthContext();
  return (
    <nav>
      <NavLink to="/">トップページ</NavLink>
      {user === null ? (
        <div>
          <NavLink to="/signup">サインアップ</NavLink>
          <NavLink to="/login">ログイン</NavLink>
        </div>
      ) : (
        <NavLink to="/bbs">掲示板へ</NavLink>
      )}
    </nav>
  );
}
