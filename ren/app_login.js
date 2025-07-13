import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/**
 * 許可するドメインのリスト
 * @type {string[]}
 */
const allowedDomains = ['ms.dendai.ac.jp']; // ここに許可したいドメインを追加

/**
 * メールアドレスのドメインが許可リストに含まれているかチェックする関数
 * @param {string} email - チェックするメールアドレス
 * @returns {boolean} - 許可されていれば true, そうでなければ false
 */
function isDomainAllowed(email) {
    // メールアドレスに'@'が含まれていない場合は無効
    if (!email || !email.includes('@')) {
        return false;
    }
    // メールアドレスから '@' の後ろの部分（ドメイン）を取得
    const domain = email.split('@')[1];

    // ドメインが許可リストに含まれているかチェック
    return allowedDomains.includes(domain);
}

const firebaseConfig = {
    // 自分のFirebase設定に差し替えてください
    apiKey: "AIzaSyBMdNIVlGBLlatRpX5Y1nDUThBhaomq1vI",
    authDomain: "dendenkeiji.firebaseapp.com",
    projectId: "dendenkeiji",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// HTML要素の取得
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// 登録
document.getElementById("signup").addEventListener("click", async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    // ドメインチェックを実行
    if (!isDomainAllowed(email)) {
        alert('このメールアドレスのドメインは登録できません。');
        return; // 処理を中断
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        alert("確認メールを送信しました。メールを確認してください。");
    } catch (e) {
        alert("登録エラー：" + e.message);
    }
});

// ログイン
document.getElementById("login").addEventListener("click", async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    // --- ▼▼▼ 追加 ▼▼▼ ---
    // ドメインチェックを実行
    if (!isDomainAllowed(email)) {
        alert('このメールアドレスのドメインではログインできません。');
        return; // 処理を中断
    }
    // --- ▲▲▲ 追加 ▲▲▲ ---

    try {
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