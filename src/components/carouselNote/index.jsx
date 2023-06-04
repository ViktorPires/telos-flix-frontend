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
import { useState } from "react";
import RatingModal from "../avaliation";

export function CarouselNote({ comments, movieId }) {
  const [filmsModal, setFilmsModal] = useState(false);
  const [show, setShow] = useState(false);
  console.log("comments", comments)
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
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <Star />
          <h3>Se liga nessas avaliações</h3>

          <div style={{ marginLeft: "130px", marginTop: "5rem" }}>
            <SecondaryGradientButton
              onClick={handleClick}
              icon={<StarBorderOutlined />}
              text="Avaliar"
            />
          </div>
        </div>
        {show && <RatingModal movieId={movieId} />}

        <div style={{ display: "flex", alignItems: "center", gap: "33px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1 style={{ fontSize: "46px" }}>4.8</h1>
            <h5 style={{ fontSize: "14px", marginTop: "-2rem" }}>
              129 avaliações
            </h5>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "21px" }}>
            <div>
              <h6>5</h6>
              <h6>4</h6>
              <h6>3</h6>
              <h6>2</h6>
              <h6>1</h6>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "17px",
              }}
            >
              <Star sx={{ width: "15px" }} />
              <Star sx={{ width: "15px" }} />
              <Star sx={{ width: "15px" }} />
              <Star sx={{ width: "15px" }} />
              <Star sx={{ width: "15px" }} />
            </div>

            <div>
              <h6>
                <LinearProgress
                  variant="determinate"
                  value={100}
                  sx={{
                    backgroundColor: "#808080",
                    width: "200px",
                    marginTop: "1rem",
                    height: "5px",
                    borderRadius: "6px",
                    boxShadow: "0px 2px 10px rgba(145, 156, 174, 0.25)",
                    "& .MuiLinearProgress-bar": { backgroundColor: `	#d3d3d3` },
                  }}
                />
              </h6>

              <h6>
                <LinearProgress
                  variant="determinate"
                  value={80}
                  sx={{
                    backgroundColor: "#808080",
                    width: "200px",
                    marginTop: "2.2rem",
                    height: "5px",
                    borderRadius: "6px",
                    boxShadow: "0px 2px 10px rgba(145, 156, 174, 0.25)",
                    "& .MuiLinearProgress-bar": { backgroundColor: `	#d3d3d3` },
                  }}
                />
              </h6>

              <h6>
                <LinearProgress
                  variant="determinate"
                  value={70}
                  sx={{
                    backgroundColor: "#808080",
                    width: "200px",
                    marginTop: "2.2rem",
                    height: "5px",
                    borderRadius: "6px",
                    boxShadow: "0px 2px 10px rgba(145, 156, 174, 0.25)",
                    "& .MuiLinearProgress-bar": { backgroundColor: `	#d3d3d3` },
                  }}
                />
              </h6>

              <h6>
                <LinearProgress
                  variant="determinate"
                  value={50}
                  sx={{
                    backgroundColor: "#808080",
                    width: "200px",
                    height: "5px",
                    marginTop: "2.2rem",
                    borderRadius: "6px",
                    boxShadow: "0px 2px 10px rgba(145, 156, 174, 0.25)",
                    "& .MuiLinearProgress-bar": { backgroundColor: `	#d3d3d3` },
                  }}
                />
              </h6>

              <h6>
                <LinearProgress
                  variant="determinate"
                  value={30}
                  sx={{
                    backgroundColor: "#808080",
                    width: "200px",
                    marginTop: "2.2rem",
                    height: "5px",
                    borderRadius: "6px",
                    boxShadow: "0px 2px 10px rgba(145, 156, 174, 0.25)",
                    "& .MuiLinearProgress-bar": { backgroundColor: `	#d3d3d3` },
                  }}
                />
              </h6>
            </div>

            <div ref={sliderRef} className="keen-slider" style={{ width: "800px" }}>
              <div
                className="keen-slider__slide number-slide1"
                style={{ display: "flex", gap: "20px" }}
              >
                { comments?.map(el => {
                  return (<div className="carouselCard" style={{ textAlign: "start" }}>
                  <h1>{el.user_id.name}</h1>
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
                    <span>{el.rating}</span>
                    <StarBorderPurple500Outlined />
                    <StarBorderPurple500Outlined />
                    <StarBorderPurple500Outlined />
                    <StarBorderPurple500Outlined />
                    <StarBorderPurple500Outlined />
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
