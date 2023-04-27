import React, { useContext } from "react";
import { useState, useEffect } from "react";
import NavBar from "../../NavBar";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../../../services/dataContext";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container as BackgroundContainer } from "../../../../pages/Profile";
const Information = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
  width: 100%;
`;
const ImagesContainer = styled.div`
  width: 40vw;
  background-color: black;
  height: 22.5vw;
  margin-inline: auto;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 20px;
  box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  background: url(${(props) => props.images});
`;
const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const Image = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.images});
  background-size: cover;
`;

const FirstHalf = styled.div`
  width: 48%;
  @media (max-width: 768px) {
    width: 95%;
  }
  margin-bottom: 0;
  height: 90vh;
  padding-top: 2rem;
  padding-bottom: 0;
  background-color: white;
  border-radius: 20px;
  box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.1);
  margin-top: 6rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
`;
const TextContainer = styled.div`
  width: 80%;
  margin-inline: auto;
`;
const Title = styled.h1`
  margin-bottom: 0;
  font-size: 2.5rem;
  word-wrap: break-word;
  margin-top: 0;
`;
const Price = styled.h1`
  font-size: 3rem;
  margin-right: 6px;
  margin-top: 0;
  display: inline;
`;

const Currency = styled.span`
  font-size: 1.5rem;
  font-weight: 0;
`;
const SecondHalf = styled.div`
  margin-top: 6rem;
  width: 48%;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 95%;
    margin-top: 1rem;
  }
`;

const UserContact = styled.div`
  margin-top: 0;
  width: 100%%;
  margin-bottom: 0;
  margin: 0;

  background-color: white;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px 120px 0px 0px;
  height: 12rem;
  box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.1);
`;
const Description = styled.div`
  background-color: white;
  padding-top: 1rem;
  padding-bottom: 1rem;
  heigth: auto;
  width: 100%;
  box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 20px 20px;
  margin-top: 1rem;
`;
const DetailContainer = styled.div`
  margin-top: 0.6rem;
  width: 100%;
`;
const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-left: 1rem;
`;
const PublishedBy = styled.h1`
  font-size: 2rem;
  font-weight: 100;
`;
const Name = styled.h1`
  font-size: 2rem;
`;
const UserAvatar = styled.div`
  margin-top: 0;
  outline: 10px solid lightgray;
  width: 10rem;
  height: 10rem;
  background: url(${(props) => props.avatarURL});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: black;
  border-radius: 1000px;
  margin-right: 2rem;
  animation: Circle-colors 15s infinite;
  margin-bottom: 0;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 7rem;
    height: 7rem;
  }
`;
const Detail = styled.p`
  margin-top: 5px;
  margin-bottom: 0;
  font-size: 1.2rem;
`;
const DetailTitle = styled.h1`
  font-size: 2.3rem;
  margin-left: 1.5rem;
  margin-top: 0;
`;
const SectionTitle = styled.h2`
  margin-left: 2rem;

  margin-bottom: 0;
`;
const SectionText = styled.p`
  margin-left: 2rem;
  margin-right: 2rem;
`;
const AllDetail = styled.div`
  width: 100%;
  word-wrap: break-word;
`;
export default function ProductPage() {
  const { productID } = useParams();
  const { userList, productList } = useContext(DataContext);
  const navigate = useNavigate();
  const [productData, setProductData] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const FetchDataForProduct = async () => {
      await productList.forEach((item) => {
        if (item.productID === productID) {
          setProductData(item);
          return;
        }
      });
      await userList.forEach((item) => {
        if (item.id === productData?.userID) {
          setUserData(item);

          return;
        }
      });
    };
    FetchDataForProduct();
  }, [productList, userList, productData, productID, userData]);

  return (
    <React.StrictMode>
      <BackgroundContainer>
        <NavBar />
        <Information>
          <FirstHalf>
            <Container>
              <Image images={productData?.images[0]}></Image>
            </Container>
            <TextContainer>
              <Title>{productData?.title || "-"}</Title>
              <span>
                <Price>{`${productData?.price || "-"}`}</Price>
                <Currency>{productData?.currency || "-"}</Currency>
              </span>
              <DetailContainer>
                <Detail>
                  {productData?.negotiable ? (
                    <FontAwesomeIcon icon={faCheckCircle} color="green" />
                  ) : (
                    <FontAwesomeIcon icon={faTimesCircle} color="red" />
                  )}{" "}
                  The price is{productData?.negotiable ? " " : "n't "}{" "}
                  negotiable
                </Detail>
                <Detail>
                  {productData?.deliveryVerification ? (
                    <FontAwesomeIcon icon={faCheckCircle} color="green" />
                  ) : (
                    <FontAwesomeIcon icon={faTimesCircle} color="red" />
                  )}{" "}
                  The delivery is
                  {productData?.deliveryVerification ? " " : "n't "}
                  with verification
                </Detail>

                <Detail style={{ marginTop: "2rem", color: "gray" }}>
                  ID: {productData?.productID}
                </Detail>
              </DetailContainer>
            </TextContainer>
          </FirstHalf>
          <SecondHalf>
            <UserContact>
              <UserAvatar
                avatarURL={userData?.avatarUrl}
                onClick={() => {
                  navigate(`/profile/${userData?.id}`);
                }}
              ></UserAvatar>
              <UserDetails>
                <PublishedBy>
                  Published by: <strong>{userData?.username}</strong>
                </PublishedBy>
                <PublishedBy>
                  Phone Number: <strong>{userData?.phone}</strong>
                </PublishedBy>
              </UserDetails>
            </UserContact>
            <Description>
              <DetailTitle>Details</DetailTitle>
              <AllDetail>
                <SectionTitle>Product located in:</SectionTitle>
                <PublishedBy
                  style={{ marginLeft: "2rem", marginTop: "0" }}
                >{`${productData?.city}, ${productData?.county}`}</PublishedBy>
                <SectionTitle>Product Description:</SectionTitle>
                <SectionText>{productData?.description}</SectionText>
                <SectionTitle>About Publisher:</SectionTitle>
                <SectionText>
                  {userData?.description || "User has no description."}
                </SectionText>
              </AllDetail>
            </Description>
          </SecondHalf>
        </Information>
      </BackgroundContainer>
    </React.StrictMode>
  );
}
