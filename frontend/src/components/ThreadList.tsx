import type { Route } from "../+types/root";

import { Link } from "react-router-dom";

import { db } from "../logic/client";
import { collection, query, orderBy } from "firebase/firestore";
import type { ThreadName } from "../routes/Threads";

import styles from "../styles/ThreadList.module.css";

type ThreadListProps = {
  threads: ThreadName[];
};
/*
export async function clientLoader(params: Route.ClientLoaderArgs) {
  const threadsRef = collection(db, "threads");
  const q = query(threadsRef, orderBy("createdAt", "desc"));
  return { threadsRef, q };
}
  */

export default function ThreadList({ threads }: ThreadListProps) {
  //const [threads, setThreads] = useState<ThreadName[]>([]);
  //const { threadsRef, q } = loaderData;
  return (
    <ul className={styles.threadList}>
      {threads.map((thread) => (
        <li key={thread.id} className={styles.threadListItem}>
          <Link to={`/bbs/${thread.id}`} className={styles.threadLink}>
            {thread.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
