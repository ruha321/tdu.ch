import type { MessagesDiv } from "../routes/Thread";

type MessagesDivProps = {
  posts: MessagesDiv[];
};

export function Posts(props: MessagesDivProps) {
  return (
    <div id="messages">
      {props.posts.map((post, i) => (
        <div key={i} className="message">
          <strong>{post.name}</strong>: {post.message}
          <br />
          <span>{post.date}</span>
        </div>
      ))}
    </div>
  );
}
