import {
  Star,
  StarBorderOutlined,
  StarBorderPurple500Outlined,
} from "@mui/icons-material";
import SecondaryGradientButton from "../secondaryGrandientButton";
import LinearProgress from "@mui/material/LinearProgress";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Arrow from "../arrow/index";

import "./index.css";
import { useState, useEffect } from "react";
import RatingModal from "../avaliation";
import { Link } from "react-router-dom";
import CreateAccountModalContent from "../createAccountModalContent";
import { useContext } from "react";
import { AuthenticateContext } from "../../contexts/AuthenticateContext";
import CustomModal from "../customModal";
import LoginModalContent from "../loginModalContent";
import SearchLoading from "../searchLoading/index";

export function CarouselNote({ comments, movieId, isLoading }) {
  const { savedUser } = useContext(AuthenticateContext);
  const [open, setOpen] = useState(false);
  const [contentToShow, setContentToShow] = useState(<></>);
  const [loadedSlider, setLoadedSlider] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const getPercentage = () => {
    const totalVotes = comments?.length;
    if (!totalVotes) {
      return [
        { rate: 5, percentage: 0 },
        { rate: 4, percentage: 0 },
        { rate: 3, percentage: 0 },
        { rate: 2, percentage: 0 },
        { rate: 1, percentage: 0 },
      ];
    }
    const counts = [0, 0, 0, 0, 0];

    comments?.forEach(({ rating }) => {
      counts[rating - 1]++;
    });

    const percentage = counts.map((count) => (count / totalVotes) * 100);
    const values = [
      { rate: 5, percentage: percentage[4] },
      { rate: 4, percentage: percentage[3] },
      { rate: 3, percentage: percentage[2] },
      { rate: 2, percentage: percentage[1] },
      { rate: 1, percentage: percentage[0] },
    ];
    return values;
  };

  const [percentages, setPercentage] = useState(getPercentage() ?? []);
  const [totalVotes, setTotalVotes] = useState(comments.length ?? 0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setPercentage(getPercentage() ?? []);
    setTotalVotes(comments.length ?? 0);
  }, [comments]);

  const getAverageRating = () => {
    const total = comments?.reduce((sum, { rating }) => sum + rating, 0);
    return comments?.length ? total / comments?.length : 0.0;
  };

  const getAmountOfRating = (ratingValue) => {
    return comments?.filter((rate) => rate.rating === ratingValue).length;
  };

  const ratingList = {};
  for (let i = 1; i <= 5; i++) {
    ratingList[i] = getAmountOfRating(i);
  }

  const getFormattedDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  };
  const mountStars = (rating) => {
    const stars = [];
    for (let currentRating = 1; currentRating <= 5; currentRating++) {
      if (currentRating <= rating) {
        stars.push(<Star key={`star-${currentRating}`} />);
      } else {
        stars.push(<StarBorderPurple500Outlined key={`star-border-${currentRating}`} />);
      }
    }
    return <>{stars}</>;
  };
  const handleClick = () => {
    setShow(!show);
  };

  const [sliderRef, internalSlider] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 2,
      spacing: 15,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoadedSlider(true);
    },
  });

  useEffect(() => {
    internalSlider?.current?.update();
  }, [comments, internalSlider]);

  return isLoading ? (
    <SearchLoading />
  ) : (
    <>
      <div
        style={{
          width: "1222px",
          margin: "auto",
          marginBottom: "5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
            gap: "18px",
            color: "white",
          }}
        >
          <Star />
          <h3>Rating</h3>

          {savedUser ? (
            <div style={{ marginLeft: "105px" }}>
              <SecondaryGradientButton
                onClick={handleClick}
                icon={<StarBorderOutlined />}
                text="Review"
              />
            </div>
          ) : (
            <Link
              style={{ textDecoration: "none" }}
              onClick={() => {
                setContentToShow(
                  <LoginModalContent
                    setCreateAccountContent={() =>
                      setContentToShow(<CreateAccountModalContent />)
                    }
                  />
                );
                setOpen(true);
              }}
            >
              <div style={{ marginLeft: "105px" }}>
                <SecondaryGradientButton
                  onClick={handleClick}
                  icon={<StarBorderOutlined />}
                  text="Review"
                />
              </div>
            </Link>
          )}
        </div>
        {show && <RatingModal movieId={movieId} />}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "33px",
            color: "white",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1 style={{ fontSize: "46px" }}>
              {getAverageRating().toFixed(1)}
            </h1>
            <h5 style={{ fontSize: "14px", marginTop: "-2rem" }}>
              {`${totalVotes} ${totalVotes === 1 ? "Review" : "Reviews"} `}
            </h5>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "21px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1px",
                color: "white",
              }}
            >
              {percentages?.map((percentage) => (
                  <div
                    key={percentage.rate}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: "17px",
                      height: "30px",
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
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: `	#d3d3d3`,
                          },
                        }}
                      />
                    </h6>
                  </div>
                ))}
            </div>
            {comments && (
              <div style={{ position: "absolute" }}>
                <div
                  ref={sliderRef}
                  className="keen-slider"
                  style={{
                    width: "800px",
                    position: "relative",
                    left: "20rem",
                  }}
                >
                  {comments.map((comment) => (
                      <div
                        key={comment._id}
                        className="carouselCard keen-slider__slide"
                        style={{ textAlign: "start" }}
                      >
                        <div className="cardHeader">
                          <h1>{comment?.user_id?.name}</h1>
                          <span>{getFormattedDate(comment?.createdAt)}</span>
                        </div>
                        <p style={{ width: "300px", fontSize: "15px" }}>
                          {comment?.content}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                          }}
                        >
                          <span>{comment?.rating.toFixed(1)}</span>
                          {mountStars(comment?.rating)}
                        </div>
                      </div>
                    ))}
                </div>
                {loadedSlider && internalSlider.current && totalVotes > 2 && (
                  <div
                    style={{
                      position: "relative",
                      bottom: "6rem",
                      left: "20rem",
                    }}
                  >
                    <Arrow
                      left
                      onClick={(e) =>
                        e.stopPropagation() || internalSlider.current?.prev()
                      }
                      disabled={currentSlide === 0}
                    />

                    <Arrow
                      onClick={(e) =>
                        e.stopPropagation() || internalSlider.current?.next()
                      }
                      disabled={
                        currentSlide === internalSlider.current.track.details.slides.length - 2
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <CustomModal open={open} setOpen={setOpen} content={contentToShow} />
    </>
  );
}
