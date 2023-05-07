import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../../common/Layouts/NavBar";
import Blueprint from "../../common/Layouts/Product/InPage";
import { DataContext } from "../../services/dataContext";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faPen, faPhone, faX } from "@fortawesome/free-solid-svg-icons";
import UploadAvatarModal from "../../common/Layouts/Modals/UploadAvatarModal";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const Container = styled.div`
  background: linear-gradient(0deg, rgb(220, 220, 220) 0%, white 100%);
  position: relative;
  overflow-x: hidden;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonStyleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
const ChangeDescriptionBg = styled.div`
  margin: 0;
  padding: 0;
  position: fixed;
  z-index: 9;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;
const ChangeDescriptionButton = styled.button`
  heeight: 1.8rem;
  width: 10rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px;
  svg,
  span {
    transition: all 0.5s ease;
  }
  transition: all 0.5s ease;
  border: 1px solid lightgray;
  background-color: white;
  :hover {
    background-color: white;
    border: 1px solid rgba(37, 102, 190, 1);
    svg,
    span {
      color: rgba(37, 102, 190, 1);
    }
  }
  text-align: left;
  margin-left: 2rem;
`;
const UploadDescription = styled.button`
  heeight: 1.8rem;
  width: 10rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px;

  transition: all 0.5s ease;
  border: 1px solid lightgray;
  background-color: white;
  :hover {
    background-color: white;
    border: 1px solid rgba(37, 102, 190, 1);
    color: rgba(37, 102, 190, 1);
  }
  margin-top: 1rem;
  text-align: center;
`;
const Cover = styled.div`
  width: 150%;

  height: 400px;
  border-radius: 50%;
  position: absolute;
  top: -200px;
  background: radial-gradient(
    circle,
    rgba(251, 228, 45, 0.8) 0%,
    rgba(222, 83, 85, 0.8) 41%,
    rgba(37, 102, 190, 0.8) 100%
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
  margin-bottom: 0.5rem;
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
  padding: 0;
  margin: 0;
  margin-bottom: 3px;
  font-weight: bold;
`;
const BlockText = styled.pre`
  margin: 0;
  padding: 0;
  font-size: 1.3rem;
  font-wrap: wrap;
  word-wrap: break-word;
  font-family: sans-serif;
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  margin-bottom: 1rem;
  gap: 10px;

  margin-left: 2rem;
`;
const ChangeAvatar = styled.input`
  display: block;
  ::-webkit-file-upload-button {
    width: 0;
    margin: 0;
    padding: 0;
  }
  ::before {
    content: "New profile photo";
    display: inline-block;
    background: linear-gradient(top, #f9f9f9, #e3e3e3);
    border: 1px solid #999;
    border-radius: 3px;
    padding: 5px 8px;

    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 700;
    font-size: 10pt;
  }
`;
const AdminUploadContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
`;
const CloseButton = styled.div`
  margin: 0;
  padding: 0;
  height: 2rem;
  display: flex;
  border: 1px solid black;
  transition: all 0.5s ease;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :hover {
    background-color: white;
    p {
      color: black;
    }
  }
  background-color: black;
  p {
    margin: 0;
    padding: 0;
    color: white;
    transition: all 0.5s ease;
  }
`;
const ChangeTextArea = styled.textarea`
  resize: none;
  width: 80%;
  height: 60%;
  text-indent: 2rem;
  font-family: sans-serif;
  padding: 20px;
  z-index: 10;
  font-size: 1rem;
`;
const DescriptionChangeContainer = styled.div`
  max-width: 800px;
  width: 98%;
  height: 600px;

  text-align: center;
  background-color: white;
  border-radius: 20px;
`;
const ProductsContainer = styled.div`
  display: flex;
  wwidth: 100%;
  flex-wrap: wrap;
`;

const Upload = styled.button`
  display: inline;
  font-weight: 700;
  font-size: 10pt;
  padding: 5px 8px;
  cursor: pointer;
  margin: 0;
`;
export default function Profile() {
  const { userID } = useParams();
  const [description, setDescription] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [change, setChange] = useState(false);
  const [productsByUser, setProductsByUser] = useState([]);
  let { userList, productList } = useContext(DataContext);
  const [fetchedData, setFetchedData] = useState({});
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setDescription(fetchedData?.description);
  }, [fetchedData]);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png"
  );

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
          (item) => item.userID === auth.currentUser?.uid
        );
        console.log(filteredProds);
        setProductsByUser(filteredProds);
      }
    };
    FetchDataForId(userID);
  }, [fetchedData, userID, userList, productList]);

  useEffect(() => {
    setAvatarUrl(fetchedData?.avatarUrl);
  }, [fetchedData]);
  const logged = localStorage.getItem("isLoggedIn");
  if (logged !== "true" && !userID) {
    return <Navigate to="/auth/login" />;
  }
  const handleUploadDescription = async (newDescription) => {
    const usersCollection = collection(db, "users");
    const myQuery = query(
      usersCollection,
      where("id", "==", auth.currentUser?.uid)
    );
    const userDoc = await getDocs(myQuery);
    await updateDoc(userDoc.docs[0].ref, {
      description: newDescription,
    });
  };

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
          id={item.productID}
        />
      );
    });
  };
  const ChangeDescription = () => {
    const [newDescription, setNewDescription] = useState(description);

    if (change) {
      return (
        <ChangeDescriptionBg>
          <DescriptionChangeContainer>
            <CloseButton
              onClick={() => {
                setChange(false);
              }}
            >
              <p>Close window</p>
            </CloseButton>
            <h1>Here you can change your description</h1>
            <ChangeTextArea
              onChange={(event) => setNewDescription(event.target.value)}
              value={newDescription}
            />
            <UploadDescription
              onClick={() => {
                handleUploadDescription(newDescription).then(() => {
                  window.location.reload(false);
                });
              }}
            >
              Upload
            </UploadDescription>
          </DescriptionChangeContainer>
        </ChangeDescriptionBg>
      );
    }
  };

  const AdminChange = () => {
    if (admin) {
      return (
        <ChangeDescriptionButton
          onClick={() => {
            setChange(true);
          }}
        >
          <ButtonStyleContainer>
            <span>Change Description</span>
            <FontAwesomeIcon icon={faPen} size="xl" />
          </ButtonStyleContainer>
        </ChangeDescriptionButton>
      );
    }
  };
  const AdminRender = () => {
    if (admin) {
      return (
        <AdminUploadContainer>
          <UploadAvatarModal />
        </AdminUploadContainer>
      );
    }
  };
  return (
    <Container>
      <Cover></Cover>
      <NavBar />
      <ProfilePic avatarURL={avatarUrl}></ProfilePic>
      <Username>{fetchedData?.username}</Username>
      <AdminRender />
      <Information>
        {/* <TextBlock style={{ borderColor: colors[0] }}>
          <Legend>Seller Details</Legend>
        </TextBlock>
        */}
        <TextBlock>
          <Legend>About</Legend>
          <TextArea>
            <Text>Description:</Text>
            <BlockText>{description}</BlockText>
          </TextArea>
          <TextArea>
            <Text>Phone number:</Text>

            <BlockText>{fetchedData?.phone}</BlockText>
          </TextArea>
          <AdminChange />
        </TextBlock>

        <TextBlock>
          <Legend>Published Products</Legend>
          <ProductsContainer>
            <ReturnBlueprints />
          </ProductsContainer>
        </TextBlock>
      </Information>
      <ChangeDescription />
    </Container>
  );
}
