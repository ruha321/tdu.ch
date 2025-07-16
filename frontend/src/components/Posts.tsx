import { useEffect, useState } from "react";
import type { MessagesDiv } from "../logic/app_thread";
import { getMessages } from "../logic/app_thread";
import type { DocumentData, Query } from "firebase/firestore";

type PostsProps = {
  messagesRef: Query<DocumentData, DocumentData>;
};

export function Posts(props: PostsProps) {
  const [posts, setPosts] = useState<MessagesDiv[]>([]);
  const { messagesRef } = props;
  useEffect(() => {
    const unsup = getMessages(setPosts)(messagesRef);
    return () => unsup();
  });
  return (
    <div id="messages">
      {posts.map((post, i) => (
        <div key={i} className="message">
          <strong>{post.name}</strong>: {post.message}
          <br />
          <span>{post.date}</span>
        </div>
      ))}
    </div>
  );
}
