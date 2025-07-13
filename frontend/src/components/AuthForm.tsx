import { useState } from "react";
import { Form } from "react-router-dom";

type AuthFormProps = {
  submitText: string;
  onSubmit: (email: string, password: string) => Promise<void>;
};

export function AuthForm({ submitText, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };
  return (
    <div>
      <Form onSubmit={handleSubmit} replace>
        <input
          type="email"
          value={email}
          placeholder="メールアドレス"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id={password}
          placeholder="パスワード"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{submitText}</button>
      </Form>
    </div>
  );
}
