import React, { useContext, useEffect, useState } from "react";
import "./../../../App.css";
import styled from "styled-components";
import Categories from "../../Componets/Categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Blueprint from "../Product/InPage";
import { DataContext } from "../../../services/dataContext";
import debounce from "lodash.debounce";
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
  const [input, setInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { productList } = useContext(DataContext);
  const [category, setCategory] = useState("");

  const filterTheProducts = () => {
    if (input !== "") {
      const debouncedFilter = debounce(() => {
        setFilteredProducts(
          productList.filter((item) => {
            if (
              item.title.toLowerCase().includes(input.toLowerCase()) &&
              item.category === localStorage.getItem("categorySelected")
            ) {
              return item;
            }
          })
        );
      }, 500);
      debouncedFilter();
    } else if (input === "") {
      setFilteredProducts([]);
    }
  };
  useEffect(() => {
    setCategory(localStorage.getItem("categorySelected"));
  }, [localStorage.getItem("categorySelected")]);
  useEffect(() => {
    filterTheProducts();
  }, [input, localStorage.getItem("categorySelected")]);
  const PrintFilteredProducts = () => {
    return filteredProducts.map((item) => {
      return (
        <Blueprint
          photoURL={
            item.images[0]
              ? item.images[0]
              : "https://jdih.palembang.go.id/assets/img/no-image.png"
          }
          title={item.title}
          location={`${item.city || "-"}, ${item.county || "-"}`}
          publishDate={item.datePublished ? item.datePublished : "-"}
          price={item.price}
          currency={item.currency}
          key={item.productID}
          id={item.productID}
        />
      );
    });
  };
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
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </InputContainer>
          <Categories />
        </Container>
        <FilteredProducts>
          <PrintFilteredProducts />
        </FilteredProducts>
      </BigContainer>
    </>
  );
}
