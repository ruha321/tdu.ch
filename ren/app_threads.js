import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
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
const auth = getAuth(app);
const threadsRef = collection(db, "threads");
const threadList = document.getElementById("thread-list");


onAuthStateChanged(auth, (user) => {
    if (user && user.emailVerified) {

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
            } catch (error) {
                console.error("スレッド作成エラー:", error);
                alert("スレッド作成に失敗しました：" + error.message);
            }
        });

    }
});