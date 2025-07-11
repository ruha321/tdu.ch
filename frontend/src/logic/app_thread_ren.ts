import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
    getFirestore,
    doc,
    getDoc,
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBMdNIVlGBLlatRpX5Y1nDUThBhaomq1vI",
    authDomain: "dendenkeiji.firebaseapp.com",
    projectId: "dendenkeiji",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// URL から threadId を取得
const urlParams = new URLSearchParams(window.location.search);
const threadId = urlParams.get("id");
if (!threadId) {
    alert("スレッドが見つかりません。");
    location.href = "threads.html";
}

const threadDocRef = doc(db, "threads", threadId);
const messagesRef = collection(threadDocRef, "messages");
const threadTitle = document.getElementById("thread-title");

// スレッドタイトル取得
getDoc(threadDocRef).then((docSnap) => {
    if (docSnap.exists()) {
        threadTitle.textContent = docSnap.data().title;
    } else {
        threadTitle.textContent = "スレッドが存在しません";
    }
});

// メッセージ表示
const q = query(messagesRef, orderBy("createdAt", "asc"));
const messagesDiv = document.getElementById("messages");

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

// 投稿
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
