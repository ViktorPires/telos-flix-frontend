import {
  Star,
  StarBorderOutlined,
  StarBorderPurple500Outlined,
} from "@mui/icons-material";
import SecondaryGradientButton from "../secondaryGrandientButton";
import LinearProgress from "@mui/material/LinearProgress";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import "./index.css";
import { useState,useEffect } from "react";
import RatingModal from "../avaliation";

export function CarouselNote({ comments, movieId }) {

  const getPercentage = () => {
    const totalVotes = comments.length;
    if(!totalVotes){
    return   [
        { rate: 1, percentage: 0 },
        { rate: 2, percentage: 0 },
        { rate: 3, percentage: 0 },
        { rate: 4, percentage: 0 },
        { rate: 5, percentage: 0 },
      ]
    }
    const counts = [0, 0, 0, 0, 0];

    comments.forEach(({ rating }) => {
      counts[rating - 1]++;
    });

    const percentage = counts.map((count) => (count / totalVotes) * 100);
    const values = [
      { rate: 1, percentage: percentage[0] },
      { rate: 2, percentage: percentage[1] },
      { rate: 3, percentage: percentage[2] },
      { rate: 4, percentage: percentage[3] },
      { rate: 5, percentage: percentage[4] },
    ]

    return values
  };

  const [filmsModal, setFilmsModal] = useState(false);
  const [percentages, setPercentage] = useState(getPercentage() ?? []);
  const [totalVotes, setTotalVotes] = useState(comments.length ?? 0);
  const [show, setShow] = useState(false);

  useEffect(()=>{
    setPercentage(getPercentage() ?? [])
    setTotalVotes(comments.length ?? 0)
  },[comments])

  const getAverageRating = () => {
    const total = comments.reduce((sum, { rating }) => sum + rating, 0);
    return comments.length ? total / comments.length : 0.0;
  };

  const getAmountOfRating = (ratingValue) => {
    return comments.filter((rate) => rate.rating === ratingValue).length;
  };


  const ratingList = {};
  for (let i = 1; i <= 5; i++) {
    ratingList[i] = getAmountOfRating(i);
  }


  const mountStars = (rating) => {
    const stars = []
    for (let currentRating = 1; currentRating <= 5; currentRating++) {
      if (currentRating <= rating) {
        stars.push(<Star />)
      } else {
        stars.push(<StarBorderPurple500Outlined />)
      }
    }
    return (<>
      {
        stars.map(component => component)
      }
    </>)
  }

  const handleClick = () => {
    setShow(!show);
  };

  const handleAssessModal = (event) => {
    setFilmsModal(!filmsModal);
  };

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 8000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <>
      <div
        style={{
          width: "1222px",
          position: "relative",
          margin: "auto",
          marginBottom: "5rem",
        }}
      >
        <div style={{ display: "flex",flexDirection:'row', alignItems: "center",alignContent:'center', gap: "18px", color:'white' }}>
          <Star />
          <h3>Check those reviews out!</h3>

          <div style={{ marginLeft: "105px", }}>
            <SecondaryGradientButton
              onClick={handleClick}
              icon={<StarBorderOutlined />}
              text="Review"
            />
          </div>
        </div>
        {show && <RatingModal movieId={movieId} />}

        <div style={{ display: "flex", alignItems: "center", gap: "33px", color: 'white' , marginTop:'10px'}}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1 style={{ fontSize: "46px" }}>{getAverageRating().toFixed(1) }</h1>
            <h5 style={{ fontSize: "14px", marginTop: "-2rem" }}>
              {`${totalVotes} ${totalVotes == 1 ? 'Review' : 'Reviews'} `}
            </h5>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "21px" }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', color: 'white' }}>
              {percentages?.map(percentage => {
                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: "17px",
                      height: '30px'
                    }}
                  >
                    <h6>{percentage.rate}</h6>
                    <Star sx={{ width: "15px" }} />
                    <h6>
                      <LinearProgress
                        variant="determinate"
                        value={percentage.percentage}
                        sx={{
                          backgroundColor: "#808080",
                          width: "200px",
                          borderRadius: "6px",
                          boxShadow: "0px 2px 10px rgba(145, 156, 174, 0.25)",
                          "& .MuiLinearProgress-bar": { backgroundColor: `	#d3d3d3` },
                        }}
                      />
                    </h6>
                  </div>
                )
              })}

            </div>

            <div ref={sliderRef} className="keen-slider" style={{ width: "800px", overflow:'scroll' }}>
              <div
                className="keen-slider__slide number-slide1"
                style={{ display: "flex", gap: "20px" }}
              >
                {comments?.map(el => {
                  return (<div className="carouselCard" style={{ textAlign: "start" }}>
                    <h1>{el?.user_id?.name}</h1>
                    <p style={{ width: "300px" }}>
                      {el.content}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <span>{el.rating.toFixed(1)}</span>
                      {mountStars(el.rating)}
                    </div>
                  </div>)
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
