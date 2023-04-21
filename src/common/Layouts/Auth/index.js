import React from "react";
import styled from "styled-components";

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  gap: 10px;
  justify-content: center;
  align-items: flex-start;
  padding: 0;
  margin-top: 0.5rem;
  width: 98%;
`;
export const Text = styled.span`
  margin: 0;
  padding: 0;
`;
export const Input = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0;
  margin: 0;
  border-radius: 5px;
  text-indent: 10px;
  border: 1px solid gray;
`;
const Background = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgb(251, 228, 45);
  background: radial-gradient(
    circle,
    rgba(251, 228, 45, 1) 0%,
    rgba(222, 83, 85, 1) 41%,
    rgba(37, 102, 190, 1) 100%
  );
`;
const Button = styled.button`
  width: 16em;
  cursor: pointer;
  height: 2.5em;
  background-color: rgba(222, 83, 85, 1);
  color: white;
  border-radius: 10px;
  border: none;
  margin-top: 0.5rem;
  &:hover {
    background-color: rgba(222, 83, 85, 0.7);
  }
  &:active {
    background-color: white;
    border: 1px solid rgba(222, 83, 85, 1);
    color: rgba(222, 83, 85, 1);
  }
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 400px;
  justify-content: center;
  align-items: center;
  width: 400px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 25px;
  > * {
    margin-bottom: 1rem;
    margin-top: 0.5rem;
  }
`;
const Divider = styled.hr`
  width: 100%;
  border: 1px solid #e1e1e1;
`;
const Title = styled.h1`
  color: black;
  font-family: "Raleway", sans-serif;
  text-align: center;
`;
const ButtonWrap = styled.div`
  font-family: "Raleway", sans-serif;
`;
const Alternative = styled.a`
  text-decoration: none;
  color: rgba(222, 83, 85, 1);
  &:hover {
    text-decoration: underline;
  }
`;
const AlternativeText = styled.span``;
const AltContainer = styled.span`
  text-align: center;
  font-family: "Raleway", sans-serif;
`;
const Error = styled.p`
  color: red;
  margin: 0;
  padding: 0;
`;
export default function AuthLayout({
  children,
  errorMessage,
  handleSubmit,
  submitText,
  redirectLink,
  redirectText,
  redirectAction,
}) {
  return (
    <Background>
      <FormContainer>
        <Title>{submitText}</Title>
        <Divider></Divider>
        {children}
        <ButtonWrap>
          <Button onClick={handleSubmit}>{submitText}</Button>
        </ButtonWrap>
        <Divider></Divider>
        <AltContainer>
          <AlternativeText>{redirectText}</AlternativeText>{" "}
          <Alternative href={redirectLink}>{redirectAction}</Alternative>
        </AltContainer>

        <Error>{errorMessage}</Error>
      </FormContainer>
    </Background>
  );
}
