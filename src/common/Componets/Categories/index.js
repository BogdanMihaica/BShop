import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faFootballBall,
  faDog,
  faPhone,
  faDice,
  faHammer,
  faPen,
  faBook,
  faPaintBrush,
  faEye,
  faTree,
  faCar,
  faTshirt,
} from "@fortawesome/free-solid-svg-icons";

export const ITEMS = [
  {
    key: 0,
    title: "Home and garden",
    icon: faHouse,
  },
  {
    key: 1,
    title: "Sport",
    icon: faFootballBall,
  },
  {
    key: 2,
    title: "Pets",
    icon: faDog,
  },
  {
    key: 3,
    title: "Electronics",
    icon: faPhone,
  },
  {
    key: 4,
    title: "Board Games",
    icon: faDice,
  },
  {
    key: 5,
    title: "Tools",
    icon: faHammer,
  },
  {
    key: 6,
    title: "School",
    icon: faPen,
  },
  {
    key: 7,
    title: "Books",
    icon: faBook,
  },
  {
    key: 8,
    title: "Passions and art",
    icon: faPaintBrush,
  },
  {
    key: 9,
    title: "Beauty and Cosmetics",
    icon: faEye,
  },
  {
    key: 10,
    title: "Clothes and fashion",
    icon: faTshirt,
  },
  {
    key: 11,
    title: "Cars and auto parts",
    icon: faCar,
  },
];

const Container = styled.div`
  width: 90%;
  height: auto;
  background: transparent;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 0;
`;
const CategoryContainer = styled.div`
  width: calc(100% / 3 - 2px);
  background: white;
  text-align: center;
  border-radius: 0px;
  border: 1px solid #dddddd;
  height: 120px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  transition: all 0.5s;
  div {
    transition: all 0.5s;
  }
  &:hover {
    background: #dddddd;
    p {
      color: black;
    }
    div {
      background: #dddddd;
    }
    div svg {
      animation: spin 1s ease;
    }
  }
  div svg {
    transition: all 0.5s;
  }
`;
const Text = styled.p`
  font-weight: bold;
  margin: 0;
  padding: 0;
`;
const IconCircle = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  background: rgb(240, 240, 240);
  justify-content: center;
  align-items: center;
  border-radius: 50px;
`;
const SelectTitle = styled.p`
  font-size: 1.2rem;
  align-self: flex-start;

  text-indent: 1.5rem;
  margin: 0;
  margin-top: 15px;
  padding: 0;
`;

const selectedList = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];
const defaultColors = ["white", "rgb(240, 240, 240)"];
const selectedColors = ["#DDDDDD", "white"];
export default function Categories() {
  const [category, setCategory] = useState("");

  function renderItems({ key, title, icon }) {
    return (
      <CategoryContainer
        style={{
          background: selectedList[key] ? selectedColors[0] : defaultColors[0],
        }}
        key={key}
        onClick={() => {
          if (selectedList[key] === true) {
            selectedList[key] = false;
            setCategory("");
          } else {
            selectedList.fill(false);
            selectedList[key] = true;
            setCategory(title);
          }
        }}
      >
        <IconCircle>
          <FontAwesomeIcon icon={icon} size="lg" />
        </IconCircle>
        <Text>{title}</Text>
      </CategoryContainer>
    );
  }
  useEffect(() => {
    localStorage.setItem("categorySelected", category);
  }, [category]);

  return (
    <>
      <SelectTitle>First, select a category:</SelectTitle>
      <Container>
        <>{ITEMS.map(renderItems)}</>
      </Container>
    </>
  );
}
