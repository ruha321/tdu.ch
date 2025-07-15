import { redirect, useNavigate } from "react-router-dom";
import { BBSForm } from "../components/BBSForm";
import { Posts } from "../components/Posts";
import { threadInfo } from "../logic/app_thread";
import type { Route } from "./+types/Thread";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
export type MessagesDiv = {
  name: string;
  message: string;
  date?: string;
};
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  try {
    const bbsId = params.bbsId;
    const { title, messages } = await threadInfo(bbsId);
    //alert("got data");
    return { title, messages, bbsId };
  } catch (e) {
    const errMes = e instanceof Error ? e.message : " 不明なエラー ";
    alert(errMes);
    return redirect("/NotFound");
  }
}

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "読み込み中..." }];
}

export default function Thread({ loaderData }: Route.ComponentProps) {
  const [posts, setPosts] = useState<MessagesDiv[]>([]);
  const navigation = useNavigate();
  const { title, messages, bbsId } = loaderData;
  useEffect(() => {
    document.title = title;
    const unsup = onSnapshot(messages, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          name: doc.data().name,
          message: doc.data().message,
          date: doc.data().createAt?.toDate?.().toLocaleString(),
        }))
      );
    });
    return () => unsup();
  }, []);
  return (
    <div>
      <h2 id="thread-title">{title}</h2>
      <BBSForm bbsId={bbsId} />
      <Posts posts={posts} />
      <button onClick={() => navigation(-1)}>戻る</button>
    </div>
  );
}
