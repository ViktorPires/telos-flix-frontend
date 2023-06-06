import React from "react";
import Trending from "../../components/trending";
import EnjoyForFree from "../../components/enjoyForFree";
import './index.css'
import DontKnowWhatToWatch from "../../components/dontKnowWhatToWatch";
import Header from "../../components/header";
import HomeCarousel from "../../components/HomeCarousel";

function Home() {
  return (
    <div>
      <Header />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <HomeCarousel />
        <div className="sectionsGrid">
          <Trending />
          <EnjoyForFree />
          <DontKnowWhatToWatch />
        </div>
      </div>
    </div>
  );
}

export default Home;
