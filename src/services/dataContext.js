import React from "react";
import { createContext } from "react";
import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const DataContext = createContext("Running");

export default function DataContextProvider({ children }) {
  const [currentUserDoc, setCurrentUserDoc] = useState();
  const [userList, setUserList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [uid, setUid] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(auth.currentUser.uid);
      }
    });
  }, []);
  useEffect(() => {
    const userCollection = collection(db, "users");
    getDocs(userCollection).then((querrySnapshot) => {
      const tempUserList = [];
      querrySnapshot.forEach((doc) => {
        tempUserList.push(doc.data());
      });
      setUserList(tempUserList);
    });
  }, []);

  useEffect(() => {
    const userCollection = collection(db, "products");
    getDocs(userCollection).then((querrySnapshot) => {
      const tempProductList = [];
      querrySnapshot.forEach((doc) => {
        tempProductList.push(doc.data());
      });
      setProductList(tempProductList);
    });
  }, []);

  useEffect(() => {
    const userCollection = collection(db, "users");

    const myQuery = query(userCollection, where("id", "==", `${uid}`));
    setCurrentUserDoc(auth.currentUser?.uid);
    // getDocs(myQuery).then((documents) => {
    //   documents.forEach((docum) => {
    //     const myDoc = doc(db, "users", docum.id);
    //     setCurrentUserDoc(myDoc);
    //   });
    // });
  }, []);
  return (
    <DataContext.Provider value={{ userList, productList }}>
      {children}
    </DataContext.Provider>
  );
}
