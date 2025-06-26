import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
    // 自分のFirebase設定に差し替えてください
    apiKey: "AIzaSyBMdNIVlGBLlatRpX5Y1nDUThBhaomq1vI",
    authDomain: "dendenkeiji.firebaseapp.com",
    projectId: "dendenkeiji",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 登録
document.getElementById("signup").addEventListener("click", async () => {
    try {
        const email = emailInput.value;
        const password = passwordInput.value;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        alert("確認メールを送信しました。メールを確認してください。");
    } catch (e) {
        alert("登録エラー：" + e.message);
    }
});

// ログイン
document.getElementById("login").addEventListener("click", async () => {
    try {
        const email = emailInput.value;
        const password = passwordInput.value;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await userCredential.user.reload();
        if (userCredential.user.emailVerified) {
            window.location.href = "bbs.html"; // 認証OK→掲示板へ
        } else {
            alert("メール認証がまだ完了していません。");
        }
    } catch (e) {
        alert("ログインエラー：" + e.message);
    }
});

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
