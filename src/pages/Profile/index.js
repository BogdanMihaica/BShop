import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../../common/Layouts/NavBar";
import Blueprint from "../../common/Layouts/Product/InPage";
import { DataContext } from "../../services/dataContext";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

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
  background: url(${(props) => props.avatarURL});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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
const ChangeAvatar = styled.input`
  padding: 0;
  margin: 0;
  width: auto;
  background: transparent;
  height: auto;
`;
const ProductsContainer = styled.div`
  display: flex;
  wwidth: 100%;
  flex-wrap: wrap;
`;

export default function Profile() {
  const { userID } = useParams();
  const [productsByUser, setProductsByUser] = useState([]);
  const { userList, productList } = useContext(DataContext);
  const [fetchedData, setFetchedData] = useState({});
  const [admin, setAdmin] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png"
  );
  useEffect(() => {}, []);
  useEffect(() => {
    const FetchDataForId = async (id) => {
      if (!id) {
        id = auth.currentUser?.uid;
        setAdmin(true);
      }
      await userList.forEach((item) => {
        if (item.id === id) {
          setFetchedData(item);
          return;
        }
      });

      if (userID) {
        const filteredProds = productList.filter(
          (item) => item.userID === userID
        );
        console.log(filteredProds);
        setProductsByUser(filteredProds);
      } else {
        const filteredProds = productList.filter(
          (item) => item.userID === auth.currentUser.uid
        );
        console.log(filteredProds);
        setProductsByUser(filteredProds);
      }
    };
    FetchDataForId(userID);
  }, [fetchedData, userID, userList]);
  useEffect(() => {
    setAvatarUrl(fetchedData?.avatarUrl);
  }, [fetchedData]);
  const logged = localStorage.getItem("isLoggedIn");
  if (logged !== "true") {
    return <Navigate to="/auth/login" />;
  }
  const ReturnBlueprints = () => {
    return productsByUser.map((item) => {
      return (
        <Blueprint
          photoURL={
            item.images[0]
              ? item.images[0]
              : "https://jdih.palembang.go.id/assets/img/no-image.png"
          }
          title={item.title}
          location={`${item.city}, ${item.county}`}
          publishDate={item.datePublished ? item.datePublished : "-"}
          price={item.price}
          currency={item.currency}
        />
      );
    });
  };
  return (
    <Container>
      <Cover></Cover>
      <NavBar />
      <ProfilePic avatarURL={avatarUrl}></ProfilePic>
      <Username>{fetchedData?.username}</Username>
      {admin ? <ChangeAvatar type="file" /> : <></>}
      <Information>
        {/* <TextBlock style={{ borderColor: colors[0] }}>
          <Legend>Seller Details</Legend>
        </TextBlock>
        */}
        <TextBlock>
          <Legend>About</Legend>
          <TextArea>
            <Text>Description:</Text>
            <BlockText>{fetchedData?.description}</BlockText>
          </TextArea>
          <TextArea>
            <Text>Phone number:</Text>

            <BlockText>{fetchedData?.phone}</BlockText>
          </TextArea>
        </TextBlock>
        <TextBlock>
          <Legend>Published Products</Legend>
          <ProductsContainer>
            <ReturnBlueprints />
          </ProductsContainer>
        </TextBlock>
      </Information>
    </Container>
  );
}
