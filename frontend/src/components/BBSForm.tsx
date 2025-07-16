import { useState } from "react";
import { postMessageToDB } from "../logic/app_thread";

type BBSProps = {
  bbsId: string;
};

export function BBSForm(props: BBSProps) {
  const [message, setMessage] = useState("");
  const { bbsId } = props;
  const handleSubmit = postMessageToDB(message)(() => setMessage(""))(bbsId);
  return (
    <form id="chat-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="メッセージ"
        value={message}
        onChange={(e) => setMessage(e.target.value.trim())}
        required
      />
      <button type="submit">送信</button>
    </form>
  );
}
