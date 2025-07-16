import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  type DocumentData,
  Query,
  CollectionReference,
} from "firebase/firestore";
import { db } from "./client.ts";
import type { ThreadName } from "../routes/Threads.tsx";
import { requireUser } from "./auth.ts";

export const threadsDataFetch = () => {
  const threadsRef = collection(db, "threads");
  const q = query(threadsRef, orderBy("createdAt", "desc"));
  return { threadsRef, q };
};

// スレッド一覧をリアルタイムに表示
export const displayThreads =
  (setThreads: React.Dispatch<React.SetStateAction<ThreadName[]>>) =>
  (q: Query<DocumentData, DocumentData>) =>
    onSnapshot(q, (snapshot) => {
      setThreads(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        }))
      );
    });

// スレッド作成 → 作成したスレッドへ即遷移
export const createThread =
  (navi: (id: string) => void | Promise<void>) =>
  (threadsRef: CollectionReference<DocumentData, DocumentData>) =>
  (newThreadTitle: string) =>
  async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await requireUser();
    const title = newThreadTitle.trim();
    if (!title) return;
    if (!user || !user.emailVerified) {
      alert("認証済みのユーザーのみスレッドを作成できます。");
      return;
    }

    try {
      const newDocRef = await addDoc(threadsRef, {
        title,
        createdAt: serverTimestamp(),
      });
      // スレッド作成成功 → thread.html にジャンプ
      navi(newDocRef.id);
    } catch (e) {
      const errMes = e instanceof Error ? e.message : "不明なエラー";
      alert("スレッド作成に失敗しました：" + errMes);
    }
  };
