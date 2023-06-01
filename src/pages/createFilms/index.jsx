import {
  Autocomplete,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import "./index.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { api } from "../../server/api";
import { AuthenticateContext } from "../../contexts/AuthenticateContext";

export default function CreateFilms() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [genres, setGenres] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");

  function addFilms() {
    if (!title || !description || !year || !genres || !image || !video) {
      return alert("Preencha todos os campos");
    }
  
    const movie = { title, description, year, genres, image, video };
    api.post("/movies", { movie })
      .then(() => {
        alert("Filme cadastrado com sucesso!");
      })
      .catch((err) => {
        console.log(err); 
        if (err.response.status === 409) {
          alert("Usuário já realizou o cadastro de filmes");
        } else {
          alert("Ocorreu um erro ao cadastrar o filme");
        }
      });
  }

  console.log(addFilms)

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
    "War"
  ];

  const updateGenres = (_, value) => {
    setGenres(value);
  };

  return (
    <>
      <div style={{ marginBottom: "5rem" }} className="createFilmsContainer">
        <div className="firstSectionFilms">
          <h1>Cadastrar filme</h1>
          <FormControl>
            <div className="inputContainerFilms" style={{ marginTop: "20px" }}>
              <label className="inputLabel">Nome do filme</label>
              <OutlinedInput
                sx={{
                  background: "rgba(255, 252, 252, 0.05)",
                  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.25)",
                  height: "42px",
                  width: "951px",
                  borderRadius: "15px",
                  border: "none",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Até 30 caracteres"
                type="text"
                startAdornment={
                  <InputAdornment>
                    <IconButton></IconButton>
                  </InputAdornment>
                }
              />
            </div>
            <p>Esse nome será exibido em todos os locais da plataforma</p>
            <div className="inputContainerFilms" style={{ marginTop: "46px" }}>
              <label className="inputLabel">Descrição</label>
              <OutlinedInput
                sx={{
                  background: "rgba(255, 252, 252, 0.05)",
                  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.25)",
                  height: "90px",
                  width: "951px",
                  borderRadius: "15px",
                  border: "none",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Até 200 caracteres"
                type="text"
                startAdornment={
                  <InputAdornment>
                    <IconButton></IconButton>
                  </InputAdornment>
                }
              />
            </div>

            <div style={{ display: "flex", gap: "42px", margin: "30px 0px" }}>
              <div>
                <h2>Ano</h2>
                <Autocomplete
                  sx={{
                    background: "rgba(255, 252, 252, 0.05)",
                    width: "120px",
                    height: "55px",
                    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.25)",
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                  ListboxProps={{
                    style: {
                      backgroundColor: "#5f5d5d",
                      color: "#bbbbbb",
                    },
                  }}
                  value={selectedYear}
                  options={years}
                  getOptionLabel={(year) => year.toString()}
                  onChange={handleYearChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      placeholder="2023"
                      variant="outlined"
                    />
                  )}
                />
              </div>

              <div>
                <div>
                  <h2>Gênero</h2>
                  <Autocomplete
                    sx={{
                      background: "rgba(255, 252, 252, 0.05)",
                      width: "120px",
                      height: "55px",
                      boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.25)",
                      color: "rgba(255, 255, 255, 0.5)",
                    }}
                    ListboxProps={{
                      style: {
                        backgroundColor: "#5f5d5d",
                        color: "#bbbbbb",
                      },
                    }}
                    value={genres}
                    options={genresList}
                    getOptionLabel={(genre) => genre}
                    onChange={updateGenres}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder="Gênero"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "25px" }}>
              <div className="inputContainerFilms">
                <label className="inputLabel">Url do banner</label>
                <OutlinedInput
                  sx={{
                    background: "rgba(255, 252, 252, 0.05)",
                    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.25)",
                    height: "42px",
                    width: "290px",
                    borderRadius: "15px",
                    border: "none",
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="url"
                  type="text"
                  startAdornment={
                    <InputAdornment>
                      <IconButton></IconButton>
                    </InputAdornment>
                  }
                />
              </div>

              <div className="inputContainerFilms">
                <label className="inputLabel">Url do video</label>
                <OutlinedInput
                  sx={{
                    background: "rgba(255, 252, 252, 0.05)",
                    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.25)",
                    height: "42px",
                    width: "290px",
                    borderRadius: "15px",
                    border: "none",
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                  value={video}
                  onChange={(e) => setVideo(e.target.value)}
                  placeholder="url"
                  type="text"
                  startAdornment={
                    <InputAdornment>
                      <IconButton></IconButton>
                    </InputAdornment>
                  }
                />
              </div>
            </div>

            <div className="ContainerButtonFilms">
              <button style={{ color: "#212121" }}>
                Cancelar e voltar
              </button>

              <button
                onClick={addFilms}
                className="teste"
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
                Cadastrar
                <ArrowForwardIcon />
              </button>
            </div>
          </FormControl>
        </div>
      </div>
    </>
  );
}