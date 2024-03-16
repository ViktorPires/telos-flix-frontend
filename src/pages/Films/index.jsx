import { useContext, useState } from "react";
import { CarouselNote } from "../../components/carouselNote";
import { FilmDescription } from "../../components/filmsDescription";
import { useParams } from "react-router-dom";
import { MovieContext } from "../../contexts/MovieContext";
import { useEffect } from "react";
import Header from "../../components/header";
import Loading from "../../components/loading";

function Films() {
  const { comments, searchById, isLoading } = useContext(MovieContext);
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

  return isLoading ? (
    <Loading />
  ) : (
    <div data-testid="films-component">
      <Header />
      <FilmDescription movie={movie} />
      <CarouselNote comments={comments} movieId={id} />
    </div>
  );
}

export default Films;