
import React from "react";
import MainVideo from "../../components/mainVideo";
import Trending from "../../components/trending";
import EnjoyForFree from "../../components/enjoyForFree";
import './index.css'
import DontKnowWhatToWatch from "../../components/dontKnowWhatToWatch";
import Header from "../../components/header";
function HomeLogin() {
  return (
    <div>
      <Header />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <MainVideo />
        <div className="sectionsGrid">
          <Trending />
          <EnjoyForFree />
          <DontKnowWhatToWatch />
        </div>
      </div>
    </div>
  );
}

export default HomeLogin;
