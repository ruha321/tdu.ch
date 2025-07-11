import { auth } from "./client"
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth";
// 登録
export async function signup(email: string, password: string) {
    // eslint-disable-next-line no-useless-catch
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        return(true);
    } catch (e) {
        throw e;
    }
};

// ログイン
export async function login(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await userCredential.user.reload();
        if (!userCredential.user.emailVerified) {
            throw new Error("メール認証がまだ完了していません。");
        } 
        return userCredential.user;
    } catch (e) {
        if(e instanceof Error){
            throw e;
        } else {
            throw new Error("不明なエラー");
        }
    }

};

// ログアウト
export async function signout() {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    });
};


//const emailInput = document.getElementById("email");
//const passwordInput = document.getElementById("password");
