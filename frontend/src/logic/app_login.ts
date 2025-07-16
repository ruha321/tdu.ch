import { auth } from "./client";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

/**
 * 許可するドメインのリスト
 * @type {string[]}
 */
const allowedDomains = ["ms.dendai.ac.jp"]; // ここに許可したいドメインを追加

/**
 * メールアドレスのドメインが許可リストに含まれているかチェックする関数
 * @param {string} email - チェックするメールアドレス
 * @returns {boolean} - 許可されていれば true, そうでなければ false
 */
function isDomainAllowed(email: string) {
  // メールアドレスに'@'が含まれていない場合は無効
  if (!email || !email.includes("@")) {
    return false;
  }
  // メールアドレスから '@' の後ろの部分（ドメイン）を取得
  const domain = email.split("@")[1];

  // ドメインが許可リストに含まれているかチェック
  return allowedDomains.includes(domain);
}
// 登録
export async function signup(email: string, password: string) {
  // ドメインチェックを実行
  if (!isDomainAllowed(email)) {
    throw new Error("このメールアドレスのドメインは登録できません。");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(userCredential.user);
    return true;
  } catch (e) {
    const errMes = e instanceof Error ? e.message : "";
    throw new Error(errMes);
  }
}

// ログイン
export async function login(email: string, password: string) {
  // ドメインチェックを実行
  if (!isDomainAllowed(email)) {
    alert("このメールアドレスのドメインは登録できません。");
    return; // 処理を中断
  }
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    await userCredential.user.reload();
    if (!userCredential.user.emailVerified) {
      throw new Error("メール認証がまだ完了していません。");
    }
    return userCredential.user;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    } else {
      throw new Error("不明なエラー");
    }
  }
}

// ログアウト
export const signout =
  (logoutNavigate: () => void | Promise<void>) => async () => {
    try {
      await signOut(auth);
      await logoutNavigate();
    } catch (e) {
      const errMes = e instanceof Error ? e.message : "";
      console.log(errMes);
    }
  };

//const emailInput = document.getElementById("email");
//const passwordInput = document.getElementById("password");
