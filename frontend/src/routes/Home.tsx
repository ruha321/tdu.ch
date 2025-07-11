import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "tduchへようこそ！" },
    { name: "description", content: "Welcome to tduch!" },
  ];
}

export default function Home() {
  return (
    <div>
      <h2>tduchへようこそ！</h2>
    </div>
  );
}
