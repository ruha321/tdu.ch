import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { signup } from "../logic/app_login";

export default function Signup() {
  const navigate = useNavigate();
  const handleSignup = async (email: string, password: string) => {
    try {
      if (await signup(email, password)) {
        alert("確認メールを送信しました。メールを確認してください。");
        navigate("/");
      }
    } catch (e) {
      let err = "";
      if (e instanceof Error) {
        err = e.message;
      } else {
        err = "不明なエラー";
      }
      alert("登録失敗：" + err);
    }
  };
  return (
    <div>
      <h2>登録</h2>
      <AuthForm submitText="登録" onSubmit={handleSignup} />
    </div>
  );
}
