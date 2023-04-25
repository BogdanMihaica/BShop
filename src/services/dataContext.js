import React from "react";
import { createContext } from "react";
import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";

export const DataContext = createContext("Running");

export default function DataContextProvider({ children }) {
  const [userList, setUserList] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const userCollection = collection(db, "users");
    getDocs(userCollection).then((querrySnapshot) => {
      querrySnapshot.forEach((doc) => {
        setUserList((oldList) => [...oldList, doc.data()]);
      });
    });
  }, []);

  useEffect(() => {
    const userCollection = collection(db, "products");
    getDocs(userCollection).then((querrySnapshot) => {
      querrySnapshot.forEach((doc) => {
        setProductList((oldList) => [...oldList, doc.data()]);
      });
    });
  }, []);
  return (
    <DataContext.Provider value={{ userList: userList }}>
      {children}
    </DataContext.Provider>
  );
}
