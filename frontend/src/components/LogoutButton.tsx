import { useNavigate } from "react-router-dom";
import { auth } from "../logic/client";
import { signOut } from "firebase/auth";

export function LogoutButton() {
  const navigate = useNavigate();
  const LogoutHandler = async () => {
    await signOut(auth);
    navigate("/", { replace: true });
  };
  return <button onClick={LogoutHandler}>ログアウト</button>;
}
