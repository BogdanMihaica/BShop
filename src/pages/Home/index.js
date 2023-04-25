import React from "react";
import styled from "styled-components";
import Find from "../../common/Layouts/Find";
import NavBar from "../../common/Layouts/NavBar";

function Home() {
  return (
    <React.StrictMode>
      <NavBar />
      <Find />
    </React.StrictMode>
  );
}

export default Home;
