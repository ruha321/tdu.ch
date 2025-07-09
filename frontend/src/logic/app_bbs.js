import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBMdNIVlGBLlatRpX5Y1nDUThBhaomq1vI",
    authDomain: "dendenkeiji.firebaseapp.com",
    projectId: "dendenkeiji",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const messagesRef = collection(db, "messages");

// ログイン状態確認
onAuthStateChanged(auth, async (user) => {
    if (!user || !user.emailVerified) {
        alert("未認証ユーザーは利用できません。");
        window.location.href = "login.html";
    }
});

// ログアウト
document.getElementById("logout").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    });
});

// 投稿処理
document.getElementById("chat-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = document.getElementById("message").value.trim();
    if (!message) return;

    await addDoc(messagesRef, {
        name: auth.currentUser.email,
        message,
        createdAt: serverTimestamp()
    });

    document.getElementById("message").value = "";
});

// 表示処理
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
