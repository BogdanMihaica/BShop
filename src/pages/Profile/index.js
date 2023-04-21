import React from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../../common/Layouts/NavBar";
import Blueprint from "../../common/Layouts/Product/InPage";

const Container = styled.div`
  background: linear-gradient(0deg, rgb(220, 220, 220) 0%, white 100%);
  position: relative;
  overflow-x: hidden;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Cover = styled.div`
  width: 150%;

  height: 400px;
  border-radius: 50%;
  position: absolute;
  top: -200px;
  background: radial-gradient(
    circle,
    rgba(251, 228, 45, 1) 0%,
    rgba(222, 83, 85, 1) 41%,
    rgba(37, 102, 190, 1) 100%
  );
`;
const ProfilePic = styled.div`
  margin-top: 100px;
  position: relative;
  width: 170px;
  height: 170px;
  background: url(https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-color: black;
  border-radius: 1000px;
  border: 10px solid white;
  margin-bottom: 0;
`;
const Username = styled.h2`
  text-align: center;
  position: relative;
  margin: 0;
  font-size: 2rem;
`;
const Information = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    margin-top: 3rem;
  }
  :last-child {
    margin-bottom: 4rem;
  }
`;
const TextBlock = styled.div`
  width: 90%;
  min-height: 80px;
  background: white;
  border: none;
  border-radius: 20px;
  box-shadow: 9px 9px 20px 10px rgba(0, 0, 0, 0.1);
  padding-bottom: 2rem;
`;
const Legend = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-left: 3rem;
`;

const Text = styled.p`
  font-size: 1.2rem;
  margin: 0;
  font-weight: bold;
`;
const BlockText = styled.p`
  margin: 0;
  font-size: 1.2rem;
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 10px;

  margin-left: 2rem;
`;
const ProductsContainer = styled.div`
  display: flex;
  wwidth: 100%;
  flex-wrap: wrap;
`;
export default function Profile() {
  const colors = [
    "rgba(251, 228, 45, 1)",
    "rgba(222, 83, 85, 1)",
    " rgba(37, 102, 190, 1)",
  ];
  const logged = localStorage.getItem("isLoggedIn");
  if (logged !== "true") {
    return <Navigate to="/auth/login" />;
  }
  return (
    <Container>
      <Cover></Cover>
      <NavBar />
      <ProfilePic></ProfilePic>
      <Username>User Name</Username>
      <Information>
        {/* <TextBlock style={{ borderColor: colors[0] }}>
          <Legend>Seller Details</Legend>
        </TextBlock>
        */}
        <TextBlock>
          <Legend>About</Legend>
          <TextArea>
            <Text>Description:</Text>
            <BlockText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </BlockText>
          </TextArea>
          <TextArea>
            <Text>Phone number:</Text>

            <BlockText>07xxxxxxxx</BlockText>
          </TextArea>
        </TextBlock>
        <TextBlock>
          <Legend>Published Products</Legend>
          <ProductsContainer>
            <Blueprint
              photoURL={"https://jdih.palembang.go.id/assets/img/no-image.png"}
              title={"Test"}
              location={"Location, Test"}
              publishDate={Date}
              price={"1000"}
              currency="EUR"
            />
            <Blueprint
              photoURL={"https://jdih.palembang.go.id/assets/img/no-image.png"}
              title={"Test"}
              location={"Location, Test"}
              publishDate={Date}
              price={"1000"}
              currency="EUR"
            />
            <Blueprint
              photoURL={"https://jdih.palembang.go.id/assets/img/no-image.png"}
              title={"Test"}
              location={"Location, Test"}
              publishDate={Date}
              price={"1000"}
              currency="EUR"
            />
            <Blueprint
              photoURL={"https://jdih.palembang.go.id/assets/img/no-image.png"}
              title={"Test"}
              location={"Location, Test"}
              publishDate={Date}
              price={"1000"}
              currency="EUR"
            />
            <Blueprint
              photoURL={"https://jdih.palembang.go.id/assets/img/no-image.png"}
              title={"Test"}
              location={"Location, Test"}
              publishDate={Date}
              price={"1000"}
              currency="EUR"
            />
          </ProductsContainer>
        </TextBlock>
      </Information>
    </Container>
  );
}
