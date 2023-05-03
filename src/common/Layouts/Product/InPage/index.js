import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Container = styled.div`
  width: 300px;
  height: 350px;
  margin-top: 2rem;
  margin-left: 2rem;
  background-color: white;
  border-radius: 20px;
  box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: center;
`;
const ImageContainer = styled.div`
  width: 270px;
  height: 180px;
  margin-top: 15px;
  margin-bottom: 10px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 15px;
`;
const Title = styled.p`
  font-size: 1.8rem;
  color: black;
  font-weight: bold;
  margin: 0px;
  text-align: center;
`;
const Detail = styled.p`
  font-size: 1.2rem;
  color: black;
  margin: 2px;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
`;

export default function Blueprint({
  photoURL,
  title,
  location,
  publishDate,
  price,
  currency,
  id,
}) {
  const navigate = useNavigate();
  return (
    <Container
      onClick={() => {
        navigate(`/product/${id}`);
      }}
    >
      <ImageContainer
        style={{ backgroundImage: `url(${photoURL})` }}
      ></ImageContainer>

      <Title>{title}</Title>
      <Details>
        <Detail>
          <strong>Located in: </strong>
          {location}
        </Detail>
        <Detail>
          <strong>Published: </strong>
          {publishDate}
        </Detail>
      </Details>
      <Title>
        {price} {currency}
      </Title>
    </Container>
  );
}
