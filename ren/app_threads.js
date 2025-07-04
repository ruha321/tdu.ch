import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
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
const threadsRef = collection(db, "threads");

const threadList = document.getElementById("thread-list");

// スレッド一覧をリアルタイムに表示
const q = query(threadsRef, orderBy("createdAt", "desc"));
onSnapshot(q, (snapshot) => {
    threadList.innerHTML = "";
    snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement("li");
        li.innerHTML = `<a href="thread.html?id=${doc.id}">${data.title}</a>`;
        threadList.appendChild(li);
    });
});

// スレッド作成 → 作成したスレッドへ即遷移
document.getElementById("new-thread-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("thread-title").value.trim();
    if (!title) return;

    try {
        const newDocRef = await addDoc(threadsRef, {
            title,
            createdAt: serverTimestamp()
        });
        // スレッド作成成功 → thread.html にジャンプ
        window.location.href = `thread.html?id=${newDocRef.id}`;
    } catch (e) {
        alert("スレッド作成に失敗しました：" + e.message);
    }
});
