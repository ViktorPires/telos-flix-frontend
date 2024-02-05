import React, { useState } from "react";
import {
  Autocomplete,
  FormControl,
  OutlinedInput,
  TextField,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { api } from "../../server/api";
import { AuthenticateContext } from "../../contexts/AuthenticateContext";
import "./index.css";
import { useContext } from "react";

export default function CreateFilms() {
  const { savedUser } = useContext(AuthenticateContext)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [genres, setGenres] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [message, setMessage] = useState({})
  const [showModal, setShowModal] = useState(true);

  async function addFilms() {
    if (!title || !description || !year || !genres || !image || !video) {
      return alert("Fill in all the fields");
    }

    const movie = { title, description, year, genres, image, video };
    try {
      api.post("/movies", { ...movie }, { headers: { 'Authorization': 'Bearer ' + savedUser.token } })
      setMessage({ message: "Movie created successfully", color: "#5cb85c" })

    } catch (err) {
      if (err.response.status === 409) {
        setMessage({ message: "Movie already exists", color: "	#ffcc00" })
      } else {
        setMessage({ message: "An error occurred while creating the movie", color: "	#cc3300" })
      }
    }

  }

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(null);
  const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

  const handleYearChange = (_, value) => {
    setSelectedYear(value);
    setYear(value);
  };

  const genresList = [
    "Action",
    "Adventure",
    "Crime",
    "Drama",
    "Family",
    "Fantasy",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "War",
  ];

  const updateGenres = (_, value) => {
    setGenres(value);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <div style={{ marginTop: "-5rem" }} className="createFilmsContainer">
        <div className="firstSectionFilms">
          <h1>Register movie</h1>
          <FormControl>
            <div className="inputContainerFilms" style={{ marginTop: "20px", position: "relative" }}>
              <label className="inputLabel">Name films</label>
              <OutlinedInput
                sx={{ background: "rgba(255, 252, 252, 0.05)", boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.25)", borderRadius: "15px", color: "rgba(255, 255, 255, 0.45)" }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="up to 30 characters"
                variant="outlined"
              />
            </div>
            <p>This name will be displayed everywhere on the platform</p>
            <div className="inputContainerFilms" style={{ marginTop: "46px" }}>
              <label className="inputLabel">Description</label>
              <OutlinedInput
                sx={{ background: "rgba(255, 252, 252, 0.05)", boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.25)", borderRadius: "15px", color: "rgba(255, 255, 255, 0.45)", padding: "30px 0px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="up to 200 characters"
                variant="outlined"
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "42px",
                margin: "30px 0px",
              }}
            >
              <div>
                <h2>Year</h2>
                <Autocomplete
                  className="color"
                  sx={{
                    background: "rgba(255, 252, 252, 0.05)",
                    boxShadow: " 0px 1px 3px rgba(0, 0, 0, 0.25)",
                    color: "rgba(255, 255, 255, 0.5)",
                    width: "150px"
                  }}
                  ListboxProps={{
                    style: {
                      backgroundColor: "#5f5d5d",
                      color: "#bbbbbb"
                    },
                  }}
                  options={years}
                  value={selectedYear}
                  onChange={handleYearChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Year"
                      variant="outlined"
                    />
                  )}
                />
              </div>

              <div>
                <h2>Genres</h2>
                <Autocomplete
                  className="color"
                  sx={{
                    background: "rgba(255, 252, 252, 0.05)",
                    boxShadow: " 0px 1px 3px rgba(0, 0, 0, 0.25)",
                    color: "rgba(255, 255, 255, 0.5)",
                    minWidth: "150px",
                    "& .MuiAutocomplete-tag": {
                      color: "rgba(255, 255, 255, 0.5)"
                    }
                  }}
                  ListboxProps={{
                    style: {
                      backgroundColor: "#5f5d5d",
                      color: "#bbbbbb"
                    },
                  }}
                  multiple
                  options={genresList}
                  onChange={updateGenres}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Genres"
                    />
                  )}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "25px" }}>
              <div className="inputContainerFilms">
                <label className="inputLabel">Banner URL</label>
                <OutlinedInput
                  sx={{ background: "rgba(255, 252, 252, 0.05)", boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.25)", borderRadius: "15px", color: "rgba(255, 255, 255, 0.45)" }}
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Banner URL"
                  variant="outlined"
                />
              </div>

              <div className="inputContainerFilms">
                <label className="inputLabel">Video URL</label>
                <OutlinedInput
                  sx={{ background: "rgba(255, 252, 252, 0.05)", boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.25)", borderRadius: "15px", color: "rgba(255, 255, 255, 0.45)" }}
                  value={video}
                  onChange={(e) => setVideo(e.target.value)}
                  placeholder="Video URL"
                  variant="outlined"
                />
              </div>
            </div>
            <span style={{ marginTop: 2, backgroundColor: '#292929', color: message.color, paddingTop: 2 }}>
              {message.message}
            </span>

            <div className="ContainerButtonFilms">
              <button
                onClick={addFilms}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "15px",
                  color: "#212121",
                  background:
                    "linear-gradient(270deg, #BFC3FC 3.25%, #E0C3FC 51.62%, #FAE69F 100%)",
                }}
              >
                Register
                <ArrowForwardIcon />
              </button>
            </div>
          </FormControl>
        </div>
      </div>
    </>
  );
}