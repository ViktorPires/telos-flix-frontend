import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";
import "./index.css";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { useContext, useState } from "react";
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

export default function RatingModal({movieId}) {
  const { createComment } = useContext(MovieContext);
  const [show, setShow] = useState(true);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const handleClose = () => {
    setShow(!show);
  };

  const handleClick = () => {
    console.log (movieId) 
    createComment(comment, rating, movieId)
  };
  

  return (
    <>
    {show &&
      <CenteredContainer>
        <div
          style={{
            width: "350px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
<>    {movieId.toString}</>
          <h1>O que você achou do filme ? </h1>
          <p>
            Dê cinco estrelas se recomendaria para seus amigos e uma caso possa
            até falar mal para eles.
          </p>
        </div>
        <Stack spacing={1}>
          <StyledRating  value={rating}  onChange={(event, newValue) => {
          setRating(newValue);
        }} name="size-large" defaultValue={2} size="large" />
        </Stack>

        <div>
          <h2>Tem algum comentário ?</h2>

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
            onChange={(event)=> setComment(event.target.value)}
            placeholder="Placeholder"
            type="text"
            startAdornment={
              <InputAdornment>
                <IconButton></IconButton>
              </InputAdornment>
            }
          />

          <div className="AvaliationButton">
            <button onClick={handleClose}>Não to afim agora</button>

            <button onClick={handleClick}>Enviar</button>
          </div>
        </div>
      </CenteredContainer>
      }
    </>
  );
}
