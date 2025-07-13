import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "../logic/client";
import { requireUser } from "../logic/auth";

type BBSProps = {
  bbsId: string;
};

export function BBSForm(props: BBSProps) {
  const [message, setMessage] = useState("");
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const user = await requireUser();
    const text = message.trim();
    if (!text) return;

    if (!user || !user.emailVerified) {
      alert("認証済みユーザーのみ投稿できます。");
      return;
    }
    //const messageRef= collection(db, "messages");
    let threadDocRef;
    if (props.bbsId === "main") {
      threadDocRef = db;
    } else {
      threadDocRef = doc(db, "threads", props.bbsId);
    }
    const messagesRef = collection(threadDocRef, "messages");
    await addDoc(messagesRef, {
      name: user.email,
      message: text,
      createdAt: serverTimestamp(),
    });
    console.log(message);
    setMessage("");
  };
  return (
    <form id="chat-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="メッセージ"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit">送信</button>
    </form>
  );
}
