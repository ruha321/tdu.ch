import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { login } from "../logic/app_login";

export const meta = () => {
  return [{ title: "ログイン tduch" }];
};

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      navigate("/bbs");
    } catch (e) {
      const err = { mes: "" };
      if (e instanceof Error) {
        err.mes = e.message;
      } else {
        err.mes = "不明なエラー";
      }
      alert("ログイン失敗：" + err.mes);
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      <AuthForm submitText="ログイン" onSubmit={handleLogin} />
    </div>
  );
}
