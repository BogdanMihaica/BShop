import React, { useState } from "react";
import AuthLayout from "../../common/Layouts/Auth";
import styled from "styled-components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Input, Text, InputWrap } from "../../common/Layouts/Auth";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { collection, doc, updateDoc } from "firebase/firestore";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    const alreadylogged = localStorage.getItem("isLoggedIn");
    if (alreadylogged === "true") {
      setErr("Already logged in! Sign out first.");
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        await localStorage.setItem("isLoggedIn", "true");
        await navigate("/");
        await alert("Succesfully logged in!");
      } catch (error) {
        setErr(error.message);
      }
    }
  };
  return (
    <AuthLayout
      errorMessage={err}
      submitText="Login"
      redirectLink="/auth/register"
      redirectAction="Sign-up here."
      redirectText="Don't have an account?  "
      handleSubmit={handleLogin}
    >
      <InputWrap>
        <Text>Email: </Text>
        <Input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          label="email"
          required
        ></Input>
      </InputWrap>
      <InputWrap>
        <Text>Password: </Text>
        <Input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label="password"
          required
        ></Input>
      </InputWrap>
    </AuthLayout>
  );
}
