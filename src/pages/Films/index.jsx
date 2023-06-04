import { useContext, useState } from "react";
import { CarouselNote } from "../../components/carouselNote";
import { FilmDescription } from "../../components/newFilms";
import { useParams } from "react-router-dom";
import { MovieContext } from "../../contexts/MovieContext";
import { useEffect } from "react";
import Header from "../../components/header";
import PrimaryGradientButton from "../../components/primaryGrandientButton";
import { PlayArrowOutlined } from "@mui/icons-material";

function Films() {

  const { movies, createComment, comments, getComments } = useContext(MovieContext);
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

    const movie = movies.find(item => item._id === id)
    console.log(comments)
    setMovieSelected(movie)
    getComments(id)
    console.log("route" + id)
  }, [])


  return (
    <>
      <Header />
      <FilmDescription movie={movieSelected} />
      <CarouselNote comments={comments} movieId={id} />
    </>
  );
}

export default Films;