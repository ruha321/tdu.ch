import { Link } from "react-router-dom";
import type { ThreadName } from "../routes/Threads";
import styles from "../styles/ThreadList.module.css";

type ThreadListProps = {
  threads: ThreadName[];
};

export default function ThreadList({ threads }: ThreadListProps) {
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
