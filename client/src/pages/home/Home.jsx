import React from "react";
import Notice from "../../components/notice/Notice";
import Poster from "../../components/poster/Poster";

const Home = () => {
  return (
    <div className="home-container">
      <Poster />
      <div className="container d-flex justify-content-center">
        <Notice />
      </div>
    </div>
  );
};

export default Home;
