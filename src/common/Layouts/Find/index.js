import React from "react";
import "./../../../App.css";
import styled from "styled-components";
import Categories from "../../Componets/Categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Blueprint from "../Product/InPage";
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 500px;
  background: rgb(240, 240, 240);
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 0.2rem;
  align-items: center;
  width: 80%;
  height: 4rem;
  background-color: white;
  margin-top: 6rem;
  z-index: 1;
  border-radius: 50px;

  svg:hover {
    animation: spin 1s ease;
  }
`;

const Input = styled.input`
  width: 80%;
  height: 4rem;
  border-radius: 50px;
  text-indent: 10px;
  font-size: 1rem;
  border: none;
  &:focus {
    outline: none;
  }
`;
const FilteredProducts = styled.div`
  width: calc(100% - 500px);
  display: flex;
  gap: 0;
  flex-wrap: wrap;
  min-height: 100vh;
  margin-left: 500px;
  background-color: rgba(220, 220, 220);
  padding-top: 4rem;
`;
const BigContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;
export default function Find() {
  let iconSize = "lg";
  return (
    <>
      <BigContainer>
        <Container>
          <InputContainer>
            <FontAwesomeIcon icon={faSearch} size={iconSize} />
            <Input
              type="text"
              label="find"
              placeholder="Name something you are looking for."
            />
          </InputContainer>
          <Categories />
        </Container>
        <FilteredProducts>
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
        </FilteredProducts>
      </BigContainer>
    </>
  );
}
