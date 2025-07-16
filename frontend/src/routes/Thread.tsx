import { redirect, useNavigate } from "react-router-dom";
import { BBSForm } from "../components/BBSForm";
import { Posts } from "../components/Posts";
import { threadInfo } from "../logic/app_thread";
import type { Route } from "./+types/Thread";
import { useEffect } from "react";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  try {
    const bbsId = params.bbsId;
    const { title, messages } = await threadInfo(bbsId);
    return { title, messages, bbsId };
  } catch (e) {
    const errMes = e instanceof Error ? e.message : " 不明なエラー ";
    alert(errMes);
    return redirect("/NotFound");
  }
}

export function meta() {
  return [{ title: "読み込み中..." }];
}

export default function Thread({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigate();
  const { title, messages, bbsId } = loaderData;
  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <div>
      <h2 id="thread-title">{title}</h2>
      <BBSForm bbsId={bbsId} />
      <Posts messagesRef={messages} />
      <button onClick={() => navigation(-1)}>戻る</button>
    </div>
  );
}
