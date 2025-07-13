import { addDoc, collection, CollectionReference, doc, getDoc, onSnapshot, orderBy, Query, query, serverTimestamp, type DocumentData } from "firebase/firestore";
import { db, auth } from "./client";

export async function threadInfo(urlId: string): Promise<{ title:string, messages: Query<DocumentData, DocumentData> }> {
    let title = "main";
// URL から threadId を取得
    const threadId = urlId;
        if (!threadId) {
            throw new Error("スレッドが見つかりません。");
        }
        if(threadId === "main") {
            const messagesRef = collection(db, "messages");
            const messages = query(messagesRef, orderBy("createdAt", "asc"))
            return { title, messages };
        }
    const threadDocRef = doc(db, "threads", threadId);
    const messagesRef =  collection(threadDocRef, "messages");

// スレッドタイトル取得
    const docSnap = await getDoc(threadDocRef);
    if (docSnap.exists()) {
        title = docSnap.data().title;
    } else {
        throw new Error("スレッドが見つかりません。");
    }
    const messages = query(messagesRef, orderBy("createdAt", "asc"));
    return {title, messages};
};

// メッセージ表示
/*
export async function getMessage(messagesRef: CollectionReference<DocumentData, DocumentData>) {
    return q;
}
    */
/*
type MessagesDiv = {
        name: string;
        message: string;
        date: string;
    }

    onSnapshot(q, (snapshot) => {
        messagesDiv.innerHTML = "";
        snapshot.forEach((doc) => {
            const data = doc.data();
            const el = document.createElement("div");
            el.className = "message";
            el.innerHTML = `<strong>${data.name}</strong>: ${data.message}<br><span>${data.createdAt?.toDate?.().toLocaleString() || ""}</span>`;
            messagesDiv.appendChild(el);
        });
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
*/

// 投稿
/*
document.getElementById("chat-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = document.getElementById("message").value.trim();
    if (!message) return;

    const user = auth.currentUser;
    if (!user || !user.emailVerified) {
        alert("ログインしている認証済みユーザーのみが投稿できます。");
        return;
    }
    console.log(auth.currentUser);
    await addDoc(messagesRef, {
        name: user.email,
        message,
        createdAt: serverTimestamp()
    });

    document.getElementById("message").value = "";
});
*/