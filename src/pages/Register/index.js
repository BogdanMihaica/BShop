import React, { useEffect, useState } from "react";
import AuthLayout from "../../common/Layouts/Auth";
import styled from "styled-components";
import { Input, Text, InputWrap } from "../../common/Layouts/Auth";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Register() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confPwd, setConfPwd] = useState("");
  const [phone, setPhone] = useState("");
  const [pwdMatch, setPwdMatch] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const userCollection = collection(db, "users");
  useEffect(() => {
    console.log(userCollection);
    verifyPass();
  }, []);

  const verifyPass = () => {
    if (password === confPwd) {
      console.log(true);
      setPwdMatch(true);
    } else setPwdMatch(false);
  };

  const handleRegister = async () => {
    const alreadylogged = localStorage.getItem("isLoggedIn");
    if (alreadylogged === "true") {
      setErr("You are logged in with an account! Sign out first.");
    } else {
      verifyPass();
      if (pwdMatch === true) {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        try {
          await addDoc(collection(db, "users"), {
            username: user,
            description: "",
            avatarUrl:
              "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png",
            phone: phone,
            id: cred.user.uid,
            userProducts: [],
          });
        } catch (err) {
          console.log(cred);
          console.log(err);
        }
        navigate("/auth/login");
      } else setErr("Passwords don't match");
    }
  };

  return (
    <AuthLayout
      errorMessage={err}
      submitText="Register"
      redirectLink="/auth/login"
      redirectAction="Sign-in here."
      redirectText="Already have an account?  "
      handleSubmit={handleRegister}
    >
      <InputWrap>
        <Text>Username: </Text>
        <Input
          type="text"
          label="username"
          placeholder="Enter an unique username"
          onChange={(e) => {
            setUser(e.target.value);
          }}
          required
        ></Input>
      </InputWrap>

      <InputWrap>
        <Text>Email: </Text>
        <Input
          type="email"
          label="email"
          placeholder="Enter a valid email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        ></Input>
      </InputWrap>

      <InputWrap>
        <Text>Password: </Text>
        <Input
          type="password"
          placeholder="Enter a strong password"
          onChange={(e) => {
            console.log(e.target.value);
            setPassword((pass) => (pass = e.target.value));
          }}
          label="password"
          required
        ></Input>
      </InputWrap>

      <InputWrap>
        <Text>Confirm Password: </Text>
        <Input
          type="password"
          placeholder="Confirm your password"
          onChange={(e) => {
            console.log(e.target.value);
            setConfPwd((pass) => (pass = e.target.value));
          }}
          required
        ></Input>
      </InputWrap>
      <InputWrap>
        <Text>Phone Number: </Text>
        <Input
          type="text"
          placeholder="Enter your phone number (optional)"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          label="phone"
          required
        ></Input>
      </InputWrap>
    </AuthLayout>
  );
}
