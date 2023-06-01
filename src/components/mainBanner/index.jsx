import React, { useContext } from "react";
import image from "./Hero.png";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { MovieContext } from "../../contexts/MovieContext";
import one from './one.jpg'
import two from './two.jpg'
import three from './three.jpg'
import four from './for.jpg'
import five from './five.jpg'

const animation = { duration: 60000, easing: (t) => t }



function MainBanner() {
  const { movies } = useContext(MovieContext);
  console.log(movies)


  const [sliderRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    drag: false,
    created(s) {
      s.moveToIdx(5, true, animation)
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
  })

  return (
    <div style={{ marginTop: "284px", position: "relative" }}>
      <img src={image} alt="Hero" />
      <div style={{ position: "absolute", top: "0", width: "1200px" }}>
        <div style={{ display: "flex", gap: "2rem" }} ref={sliderRef} className="keen-slider">
          <div style={{ display: "flex", gap: "2rem" }} className="keen-slider__slide number-slide1">
            <img style={{ width: "1100px", height: "650px", objectFit: "contain", borderRadius: "18px" }} src={one} alt="" />
            <img style={{ width: "1100px", height: "650px", objectFit: "contain", borderRadius: "18px" }} src={two} alt="" />
          </div>
          <div style={{ display: "flex", gap: "2rem" }} className="keen-slider__slide number-slide2">
            <img style={{ width: "1100px", height: "650px", objectFit: "contain", borderRadius: "18px" }} src={four} alt="" />
            <img style={{ width: "1100px", height: "650px", objectFit: "contain", borderRadius: "18px" }} src={five} alt="" />
          </div>
          <div style={{ display: "flex", gap: "2rem" }} className="keen-slider__slide number-slide3">
            <img style={{ width: "1100px", height: "650px", objectFit: "contain", borderRadius: "18px" }} src={two} alt="" />
            <img style={{ width: "1100px", height: "650px", objectFit: "contain", borderRadius: "18px" }} src={three} alt="" />
          </div>
          <div style={{ display: "flex", gap: "2rem" }} className="keen-slider__slide number-slide4">
            <img style={{ width: "1100px", height: "650px", objectFit: "contain", borderRadius: "18px" }} src={four} alt="" />
            <img style={{ width: "1100px", height: "650px", objectFit: "contain", borderRadius: "18px" }} src={five} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
