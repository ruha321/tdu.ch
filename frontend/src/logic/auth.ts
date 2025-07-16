import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./client";

export const requireUser: () => Promise<User | null> = async () => {
  return new Promise((resolve) => {
    const unsup = onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
    unsup();
  });
};
