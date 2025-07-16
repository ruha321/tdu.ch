import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  Query,
  query,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";
import { db } from "./client";
import { requireUser } from "./auth";
import { main } from "../routes/BBS";

export async function threadInfo(
  urlId: string
): Promise<{ title: string; messages: Query<DocumentData, DocumentData> }> {
  // URL から threadId を取得
  const threadId = urlId;
  if (!threadId) {
    throw new Error("スレッドが見つかりません。");
  }
  if (threadId === main) {
    const messagesRef = collection(db, "messages");
    const messages = query(messagesRef, orderBy("createdAt", "asc"));
    return { title: "メインページ", messages };
  }
  const threadDocRef = doc(db, "threads", threadId);
  const messagesRef = collection(threadDocRef, "messages");

  // スレッドタイトル取得
  const docSnap = await getDoc(threadDocRef);
  const title = (() => {
    if (docSnap.exists()) {
      return docSnap.data().title;
    } else {
      throw new Error("スレッドが見つかりません。");
    }
  })();
  const messages = query(messagesRef, orderBy("createdAt", "asc"));
  return { title, messages };
}

// メッセージ表示
/*
export async function getMessage(messagesRef: CollectionReference<DocumentData, DocumentData>) {
    return q;
}
    */

export type MessagesDiv = {
  name: string;
  message: string;
  date: string;
};

export const getMessages =
  (setPosts: React.Dispatch<React.SetStateAction<MessagesDiv[]>>) =>
  (q: Query<DocumentData, DocumentData>) =>
    onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          name: doc.data().name,
          message: doc.data().message,
          date: doc.data().createdAt?.toDate?.().toLocaleString(),
        }))
      );
    });

// 投稿
// document.getElementById("chat-form").addEventListener("submit",
export const postMessageToDB =
  (message: string) =>
  (setMessageNone: () => void) =>
  (bbsId: string) =>
  async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await requireUser();
    const text = message.trim();
    if (!message || message === "") return;

    if (!user || !user.emailVerified) {
      alert("ログインしている認証済みユーザーのみが投稿できます。");
      return;
    }
    //console.log(auth.currentUser);
    const messagesRef = ((bbsId: string) => {
      if (bbsId === main) {
        return collection(db, "messages");
      } else {
        const threadDocRef = doc(db, "threads", bbsId);
        return collection(threadDocRef, "messages");
      }
    })(bbsId);
    await addDoc(messagesRef, {
      name: user.email,
      message: text,
      createdAt: serverTimestamp(),
    });
    console.log(message);
    setMessageNone();
  };
