import { useContext, useState } from "react";
import { CarouselNote } from "../../components/carouselNote";
import { FilmDescription } from "../../components/newFilms";
import { useParams } from "react-router-dom";
import { MovieContext } from "../../contexts/MovieContext";
import { useEffect } from "react";
import Header from "../../components/header";

function Films() {

  const { movies, createComment, comments, getComments } = useContext(MovieContext);
  const { id } = useParams()
  const [movieSelected, setMovieSelected] = useState({
    title: "",
    src: ""
  })

  useEffect(() => {

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