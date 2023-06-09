import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../../../common/Layouts/NavBar";
import { ITEMS } from "../../../common/Componets/Categories";
import UploadProdPhotoModal from "../../../common/Layouts/Modals/UploadPhotoModal";
import { auth, db } from "../../../config/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../services/dataContext";
const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  min-height: 100px;
  background: white;
  margin-top: 2rem;
  box-shadow: 9px 9px 20px 10px rgba(0, 0, 0, 0.1);
  :first-child {
    margin-top: 2rem;
  }
  :last-child {
    margin-bottom: 4rem;
  }
  border-radius: 10px;
`;
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  column-gap: 2rem;
  align-items: center;
  background: rgb(240, 240, 240);
`;
const Input = styled.input`
  width: 50%;
  height: 4rem;
  padding: 0;
  margin: 20px;
  border: none;
  &:focus {
    outline: none;
  }
  text-indent: 20px;
  font-size: 1.3rem;
  background: rgb(240, 240, 240);
  margin-top: 0;
`;

const Select = styled.select`
  width: 30%;
  height: 4rem;
  padding: 0;
  margin: 20px;
  border: none;
  margin-top: 0;
  outline: none;
  text-indent: 20px;
  font-size: 1.3rem;
  background: rgb(240, 240, 240);
`;

const TextArea = styled.textarea`
  width: 50%;
  height: 200px;
  padding-top: 10px;
  font-size: 1.1rem;
  resize: none;
  outline: none;
  border: none;
  background: rgb(240, 240, 240);
  margin-bottom: 2rem;
  margin-left: 20px;
  text-indent: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
`;
const DescribeInput = styled.h2`
  text-align: left;
  text-indent: 1.5rem;
  font-size: 1.5rem;
`;
const Title = styled.h1`
  text-align: center;
  margin-top: 6rem;
  margin-bottom: 0;
`;
const PhotoContainer = styled.div`
  margin-left: 20px;
  margin-bottom: 2rem;
  width: 450px;
`;

const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
const SmallInput = styled.input`
  width: 200px;
  height: 4rem;
  padding: 0;
  margin: 20px;
  border: none;
  &:focus {
    outline: none;
  }
  text-indent: 20px;
  font-size: 1.3rem;
  background: rgb(240, 240, 240);
  margin-top: 0;
  margin-right: 0;
`;
const ExchangeType = styled.select`
  width: 5rem;
  height: 4rem;
  padding: 0;
  margin: 10px;
  border: none;

  margin-top: 0;
  outline: none;
  text-indent: 5px;
  font-size: 1.3rem;
  background: rgb(240, 240, 240);
`;
const CheckInput = styled.input`
  width: 20px;
  height: 20px;
  margin-left: 20px;
`;
const CheckContainer = styled.div`
  :last-child {
    margin-bottom: 2rem;
  }
  column-gap: 10px;
  display: flex;
  margin-bottom: 1rem;
`;
const CheckText = styled.p`
  font-size: 1.1rem;
  margin: 0;
  padding: 0;
`;
const Publish = styled.button`
  background: linear-gradient(
    to left,
    rgba(251, 228, 45, 0.8) 0%,

    rgba(37, 102, 190, 0.8) 100%
  );
  width: 10rem;
  padding: 0.6em;
  font-size: 1.2rem;
  border: none;
  color: white;
  border-radius: 15px;
  margin-left: 20px;

  cursor: pointer;
  &:hover {
    background: linear-gradient(
      to left,
      rgba(251, 228, 45, 0.6) 0%,
      rgba(37, 102, 190, 0.6) 100%
    );
  }
`;
const Error = styled.h4`
  color: red;
  padding: 0;
  margin-left: 2rem;
`;
export default function AddForm() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const day = today.getDate();
  const monthIndex = today.getMonth();
  const monthName = months[monthIndex];
  const year = today.getFullYear();
  const [uploadStatus, setUploadStatus] = useState(false);
  const [images, setImages] = useState([]);
  const [err, setErr] = useState("");
  const [category, setCategory] = useState("Home and garden");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("RON");
  const [nego, setNego] = useState(false);
  const [dwv, setDwv] = useState(false);
  const [county, setCounty] = useState("");
  const [city, setCity] = useState("");
  const [productID, setProductID] = useState("");
  const navigate = useNavigate();
  const productCollection = collection(db, "products");
  const { currentUserDoc } = useContext(DataContext);

  const [userDocs, setUserDocs] = useState([]);
  useEffect(() => {
    setProductID(uuid());
  }, []);
  const missingSomething = () => {
    return (
      category === "" ||
      title === "" ||
      description === "" ||
      price === "" ||
      county === "" ||
      city === ""
    );
  };

  async function handleUpload() {
    await setUploadStatus(false);
    if (!missingSomething()) {
      console.log(productID);
      await setUploadStatus(true);
      try {
        const currentDoc = await addDoc(productCollection, {
          datePublished: `${day}/${monthName}/${year}`,
          county,
          category,
          city,
          currency,
          productID,
          userID: auth.currentUser.uid,
          negotiable: nego,
          deliveryVerification: dwv,
          title,
          description,
          price,
          images,
        });

        await setErr("");
        await alert("Success");
        await navigate("/");
      } catch (err) {
        setErr(err);
      }
    } else {
      setErr("All fields (except images) are required! ");
    }
    setUploadStatus(false);
  }
  const renderOptions = ({ key, title, icon }) => {
    return (
      <option value={title} key={key}>
        {title}
      </option>
    );
  };

  return (
    <React.StrictMode>
      <NavBar />

      <Container>
        <Title>Publish your product</Title>
        <FormBlock>
          <DescribeInput>Title</DescribeInput>
          <Input
            placeholder="eg.: Adidas shoes"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            key="title"
          />
          <DescribeInput>Category</DescribeInput>
          <Select
            selected="Select a category."
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            key="category"
          >
            {ITEMS.map(renderOptions)}
          </Select>
          <DescribeInput>Location</DescribeInput>
          <LineContainer>
            <SmallInput
              key="county"
              placeholder="County"
              onChange={(e) => {
                setCounty(e.target.value);
              }}
            />
            <SmallInput
              key="city"
              placeholder="City"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </LineContainer>
          <DescribeInput>Description</DescribeInput>
          <TextArea
            key="description"
            placeholder="Enter a very suggestive description. Keep it below 500 characters."
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            maxLength="500"
          ></TextArea>
        </FormBlock>
        <FormBlock>
          <DescribeInput>
            Upload images of your product {"(max. 8)"}
          </DescribeInput>
          <PhotoContainer>
            <UploadProdPhotoModal
              style={{ marginLeft: 20 }}
              uploaded={uploadStatus}
              productID={productID}
            />
          </PhotoContainer>
        </FormBlock>
        <FormBlock>
          <DescribeInput>Price</DescribeInput>
          <LineContainer>
            <SmallInput
              key="price"
              type="number"
              placeholder="Enter a price"
              onChange={(e) => {
                setPrice(e.target.value.toString());
              }}
              maxLength="7"
            />
            <ExchangeType
              key="exchange"
              onChange={(e) => {
                setCurrency(e.target.value);
              }}
            >
              <option>RON</option>
              <option>EUR</option>
              <option>USD</option>
              <option>GBP</option>
            </ExchangeType>
          </LineContainer>
          <CheckContainer>
            <CheckInput
              key="negotiable"
              type="checkbox"
              onChange={(e) => {
                setNego(e.target.checked);
                console.log(e.target.checked);
              }}
            />
            <CheckText>Negotiable</CheckText>
          </CheckContainer>
          <CheckContainer>
            <CheckInput
              key="dwv"
              type="checkbox"
              onChange={(e) => {
                setDwv(e.target.checked);
                console.log(e.target.checked);
              }}
            />
            <CheckText>Delivery with verification</CheckText>
          </CheckContainer>
          <Publish onClick={handleUpload}>Publish product</Publish>
          <Error>{err}</Error>
        </FormBlock>
      </Container>
    </React.StrictMode>
  );
}
