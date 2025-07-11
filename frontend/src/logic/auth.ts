import { redirect } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./client";

export async function requireUser() {
    const user = auth.currentUser;
    return user;
}