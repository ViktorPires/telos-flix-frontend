import React, { useContext, useEffect, useRef, useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";
import "./index.css";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { MovieContext } from "../../contexts/MovieContext";

const CenteredContainer = styled("div")`
  position: absolute;
  z-index: 1;
  margin-left: 30%;
  bottom: 2%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 460px;
  height: 551px;
  padding: 0px 20px 60px;
  gap: 38px;
  background: #3d4757;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07),
    0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275),
    0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 35px;

  p,
  h2 {
    text-align: start;
  }
`;

const StyledRating = styled(Rating)`
  & .MuiRating-iconEmpty {
    color: #d7e7ff;
    font-size: 35px;
  }
  & .MuiRating-iconHover {
    color: #3888ff;
    font-size: 35px;
  }
  & .MuiRating-iconFilled {
    color: #3888ff;
    font-size: 35px;
  }
`;

export default function RatingModal({ movieId }) {
  const { createComment } = useContext(MovieContext);
  const [show, setShow] = useState(true);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const modalRef = useRef(null);

  const handleClose = () => {
    setShow(false);
  };

  const handleClick = () => {
    createComment(comment, rating, movieId);
    setShow(false);
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      {show && (
        <CenteredContainer ref={modalRef}>
          <div
            style={{
              width: "350px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h1>What did you think of the movie?</h1>
            <p>
              Give five stars if you recommend it to your friends and one if you can even speak ill of the
            </p>
          </div>
          <Stack spacing={1}>
            <StyledRating
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              name="size-large"
              defaultValue={2}
              size="large"
            />
          </Stack>

          <div>
            <h2>Do you have any comments?</h2>

            <OutlinedInput
              sx={{
                background: "#3D4757",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.25)",
                height: "75px",
                width: "370px",
                borderRadius: "15px;",
                border: "none",
                color: "rgba(255, 255, 255, 0.5)",
              }}
              onChange={(event) => setComment(event.target.value)}
              placeholder="inform evaluation"
              type="text"
              startAdornment={
                <InputAdornment>
                  <IconButton></IconButton>
                </InputAdornment>
              }
            />

            <div className="AvaliationButton">
              <button onClick={handleClose}>Close</button>

              <button onClick={handleClick}>Send</button>
            </div>
          </div>
        </CenteredContainer>
      )}
    </>
  );
}