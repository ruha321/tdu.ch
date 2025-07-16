import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/BodyLayout.tsx", [
    index("./routes/Home.tsx"),
    route("/login", "routes/Login.tsx"),
    route("/signup", "routes/Signup.tsx"),
    route("/bbs", "routes/BBS.tsx", [
      route("/bbs/threads", "routes/Threads.tsx"),
      route("/bbs/:bbsId", "routes/Thread.tsx"),
    ]),
    route("*?", "routes/404.tsx"),
  ]),
] satisfies RouteConfig;
