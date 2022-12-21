import { db } from "../firestore";
import { collection, getDocs } from "firebase/firestore";

export const getAllKeyboards = async () => {
  const querySnapshot = await getDocs(collection(db, "keyboards"));

  const dataArray = querySnapshot.docs.map((doc) => {
    const id = doc.id;
    const data = doc.data();
    return { id, ...data };
  });
  return dataArray;
};
