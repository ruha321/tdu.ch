import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../logic/client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { requireUser } from "../logic/auth";
import type { Route } from "./+types/Threads";
type ThreadName = {
  id: string;
  title: string;
};

/*
    const href<string> = "/bbs/" + doc.id;
      <li><Link to=href>{doc.title}</Link></l
      */
export async function clientLoader(params: Route.ClientLoaderArgs) {
  const threadsRef = collection(db, "threads");
  const q = query(threadsRef, orderBy("createdAt", "desc"));
  return { threadsRef, q };
}

export function meta() {
  return [{ title: "スレッド一覧" }];
}

export default function Threads({ loaderData }: Route.ComponentProps) {
  // スレッド一覧をリアルタイムに表示
  const [threads, setThreads] = useState<ThreadName[]>([]);
  const [threadTitle, setThreadTitle] = useState("");
  const navigation = useNavigate();
  const { threadsRef, q } = loaderData;
  useEffect(() => {
    const unsub = onSnapshot(q, (snapshot) => {
      setThreads(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        }))
      );
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const user = await requireUser();
    const title = threadTitle.trim();
    if (!title) return;
    if (!user || !user.emailVerified) {
      alert("認証済みユーザーのみスレッドを作成できます。");
      return;
    }
    try {
      const newDocRef = await addDoc(threadsRef, {
        title,
        createdAt: serverTimestamp(),
      });
      navigation("/bbs/" + newDocRef.id);
    } catch (e) {
      const errMes = e instanceof Error ? e.message : "不明なエラー";
      alert("スレッド作成に失敗しました：" + errMes);
    }
  };

  return (
    <div>
      <h2>スレッド一覧</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={threadTitle}
          placeholder="新しいスレッドタイトル"
          onChange={(e) => setThreadTitle(e.target.value)}
          required
        />
        <button type="submit">作成</button>
      </form>
      <button onClick={() => navigation(-1)}>戻る</button>
      <ul className="thread-list">
        {threads.map((thread) => (
          <li key={thread.id}>
            <Link to={`/bbs/${thread.id}`}>{thread.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
