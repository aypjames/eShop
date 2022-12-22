import { db } from "../firestore";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

export const getAllKeyboardsFromDb = async () => {
  const querySnapshot = await getDocs(collection(db, "keyboards"));

  const dataArray = querySnapshot.docs.map((docu) => {
    const id = docu.id;
    const data = docu.data();
    return { id, ...data };
  });
  return dataArray;
};

export const getKeyboardByIdFromDb = async (keyboardId) => {
  const docRef = doc(db, "keyboards", keyboardId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const updateFieldInDb = async (keyboardId, fieldName, newValue) => {
  const keyboardRef = doc(db, "keyboards", keyboardId);

  // Set or remove as favourite.
  await updateDoc(keyboardRef, {
    [`${fieldName}`]: newValue,
  });
};
