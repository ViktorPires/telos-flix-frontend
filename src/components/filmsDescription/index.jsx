import { PlayArrowOutlined } from "@mui/icons-material";
import PrimaryGradientButton from "../primaryGrandientButton";
import "./index.css";
import { Link } from "react-router-dom";
import { Zoom } from "react-reveal";
import { useContext, useState } from "react";
import { AuthenticateContext } from "../../contexts/AuthenticateContext";
import CreateAccountModalContent from "../createAccountModalContent";
import CustomModal from "../customModal";
import LoginModalContent from "../loginModalContent";

export function FilmDescription({ movie }) {
  const { savedUser } = useContext(AuthenticateContext);
  const [open, setOpen] = useState(false);
  const [contentToShow, setContentToShow] = useState(<></>);
  return (
    <>
      <Zoom duraction={100}>
        <div className="containerFilms">
          <div style={{ position: "absolute" }}>
            <h3>{movie?.genres?.join(" | ")}</h3>
            <img
              style={{
                height: "600px",
                objectFit: "contain",
              }}
              src={movie?.image}
              alt={movie?.title}
            />
            <div
              style={{
                position: "relative",
                bottom: "0",
                margin: "0rem 2.5rem 3rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid white",
                }}
              >
                <h1 style={{ textAlign: "justify", fontSize: "1.1rem" }}>
                  {movie?.title}
                </h1>
                <h2>{movie?.year}</h2>
              </div>
              <div
                style={{
                  display: "flex",
                  textAlign: "justify",
                }}
              >
                <p>{movie?.description}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {savedUser || movie?.isFree ? (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/video/${movie?._id}`}
                  >
                    <PrimaryGradientButton
                      icon={<PlayArrowOutlined />}
                      text="Watch"
                    />
                  </Link>
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
                    <PrimaryGradientButton
                      icon={<PlayArrowOutlined />}
                      text="Watch"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </Zoom>
      <CustomModal open={open} setOpen={setOpen} content={contentToShow} />
    </>
  );
}
