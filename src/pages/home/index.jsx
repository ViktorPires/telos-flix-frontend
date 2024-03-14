import React, { useContext } from "react";
import Trending from "../../components/trending";
import EnjoyForFree from "../../components/enjoyForFree";
import "./index.css";
import DontKnowWhatToWatch from "../../components/dontKnowWhatToWatch";
import Header from "../../components/header";
import HomeCarousel from "../../components/HomeCarousel";
import Loading from "../../components/loading";
import { MovieContext } from "../../contexts/MovieContext";

function Home() {
  const { isLoading } = useContext(MovieContext);

  return isLoading ? (
    <Loading />
  ) : (
    <div data-testid="home-component">
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
