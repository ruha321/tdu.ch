//import { useState } from "react";
import { useEffect, type ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BBS from "./pages/BBS";

type Page = {
  path: string;
  key: string;
  element: ReactElement;
};

const pages: Page[] = [
  {
    path: "/home",
    key: "home",
    element: <Home />,
  },
  {
    path: "/login",
    key: "login",
    element: <Login />,
  },
  {
    path: "/signup",
    key: "signup",
    element: <Signup />,
  },
  {
    path: "/bbs",
    key: "bbs",
    element: <BBS />,
  },
];

function App() {
  useEffect(() => {
    //const body = document.getElementsByTagName("body")[0] as HTMLElement;
    //const scriptUrl = document.createElement("script");
    //scriptUrl.type = "module";
    //scriptUrl.src = "app_login.js";
    //body.appendChild(scriptUrl);
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {pages.map((page) =>
            page.key === "home" ? (
              <Route key={page.key} index element={page.element} />
            ) : (
              <Route key={page.key} path={page.path} element={page.element} />
            )
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

/*
    <main>
      <h1>ログインまたは登録</h1>
      <input type="email" id="email" placeholder="メールアドレス" />
      <input type="password" id="password" placeholder="パスワード" />
      <button id="signup">登録</button>
      <button id="login" onClick={login}>
        ログイン
      </button>
    </main>
    */
//<script type="module" src="./app_login.js"></script>
export default App;
