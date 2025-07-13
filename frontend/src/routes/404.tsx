import { data } from "react-router-dom";
import type { Route } from "./+types/404";

/*
export async function clientLoader({ params }: Route.ActionArgs) {
  throw data(null, { status: 404 });
}
  */
export function meta() {
  return [
    { title: "404 NotFound" },
    { name: "description", content: "Not Found" },
  ];
}
export default function NotFound() {
  return (
    <div>
      <h2>404エラー</h2>
      <p>お探しのページは削除されたか存在しません。</p>
    </div>
  );
}
