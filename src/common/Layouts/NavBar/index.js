import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faPlus,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import LogoPNG from "./LogoPNG.png";
import { auth } from "../../../config/firebase";
const MENU_ITEMS = [
  {
    key: "inbox",
    title: "Inbox",
    path: "/profile/inbox",
    icon: faMessage,
  },
  {
    key: "account",
    title: "Your account",
    path: "/profile",
    icon: faUserCircle,
  },
  {
    key: "add_product",
    title: "Add your product",
    path: "/profile/add",
    icon: faPlus,
  },
];

const LogoContaner = styled.div`
  img {
    width: 8rem;
  }
  margin: 7px 0 0 8rem;
`;
const Container = styled.div`
  z-index: 8;
  width: 100%;
  height: 4rem;
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: rgb(251, 228, 45);
  background: linear-gradient(
    to left,
    rgba(251, 228, 45, 1) 0%,
    rgba(222, 83, 85, 1) 41%,
    rgba(37, 102, 190, 1) 100%
  );
`;
const Click = styled.a`
  text-decoration: none;
  color: black;
  font-weight: 0;
`;
function renderRoutes({ key, title, path, icon }) {
  return (
    <li key={key}>
      <Link to={path}>
        <FontAwesomeIcon icon={icon} />
        {title}
      </Link>
    </li>
  );
}
const ItemContainer = styled.div`
 
  :last-child {
    margin-right: 8rem;
  }
  > *:not(:last-child) {
    margin-right:3rem;
  }
  
  display: flex;
  margin: 0;
  padding: 0;
  list-style-type: none;
  li a {
    color: white;
    text-decoration: none;
  }
  li {
     a:hover
      {
        color: #ffffffaa;
        svg{
          color: #ffffffaa;
        }
      }
      
    }
  }
  svg {
    color: white;
    margin-right: 5px;
  }
  font-weight: bold;
  font-size: 1.2rem;
`;

export default function NavBar() {
  const navigate = useNavigate();
  const SignOut = () => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      return (
        <Click
          href=""
          onClick={() => {
            auth.signOut();
            localStorage.setItem("isLoggedIn", "false");
            navigate("/auth/login");
          }}
        >
          <li>Sign out</li>
        </Click>
      );
    }
  };
  return (
    <Container>
      <LogoContaner>
        <a href="/">
          <img src={LogoPNG} alt="logo" />
        </a>
      </LogoContaner>
      <ItemContainer>
        {MENU_ITEMS.map(renderRoutes)}
        {SignOut()}
      </ItemContainer>
    </Container>
  );
}
