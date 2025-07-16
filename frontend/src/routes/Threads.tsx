import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  displayThreads,
  createThread,
  threadsDataFetch,
} from "../logic/app_threads";
import type { Route } from "./+types/Threads";
import ThreadList from "../components/ThreadList";
export type ThreadName = {
  id: string;
  title: string;
};
import styles from "../styles/Threads.module.css";

export async function clientLoader() {
  return threadsDataFetch();
}

export function meta() {
  return [{ title: "スレッド一覧" }];
}

export default function Threads({ loaderData }: Route.ComponentProps) {
  // スレッド一覧をリアルタイムに表示
  const [threads, setThreads] = useState<ThreadName[]>([]);
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const navigation = useNavigate();
  const { threadsRef, q } = loaderData;
  const newThreadNavi = (id: string) => navigation("/bbs/" + id);
  useEffect(() => {
    const unsub = displayThreads(setThreads)(q);
    return () => unsub();
  }, []);

  const handleSubmit = createThread(newThreadNavi)(threadsRef)(newThreadTitle);

  return (
    <div>
      <h2>スレッド一覧</h2>
      <form onSubmit={handleSubmit} className={styles.newThreadForm}>
        <input
          type="text"
          value={newThreadTitle}
          placeholder="新しいスレッドタイトル"
          onChange={(e) => setNewThreadTitle(e.target.value)}
          className={styles.newThreadInput}
          required
        />
        <button type="submit" className={styles.newThreadButton}>
          作成
        </button>
      </form>
      <ThreadList threads={threads} />
      <button onClick={() => navigation(-1)}>戻る</button>
    </div>
  );
}
