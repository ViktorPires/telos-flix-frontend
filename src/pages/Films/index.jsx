import { useContext, useState } from "react";
import { CarouselNote } from "../../components/carouselNote";
import { NewFilms } from "../../components/newFilms";
import { Link, useParams } from "react-router-dom";
import { MovieContext } from "../../contexts/MovieContext";
import { useEffect } from "react";
import Header from "../../components/header";
import PrimaryGradientButton from "../../components/primaryGrandientButton";
import { PlayArrowOutlined } from "@mui/icons-material";

function Films() {

  const { searchById } = useContext(MovieContext);
  const { id } = useParams()
  const [movie, setMovie] = useState({
    title: "",
    src: ""
  })

  useEffect(() => {
    async function fetchData() {
      const { data } = await searchById(id)
      setMovie(data)
    }
    fetchData()
  }, [id, searchById])



  return (
    <>
      <Header />
      <NewFilms movie={movie} />
      <CarouselNote />
    </>
  );
}

export default Films;