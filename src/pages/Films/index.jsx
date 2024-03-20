import { useContext, useState } from "react";
import { CarouselNote } from "../../components/carouselNote";
import { FilmDescription } from "../../components/filmsDescription";
import { useParams } from "react-router-dom";
import { MovieContext } from "../../contexts/MovieContext";
import { useEffect } from "react";
import Header from "../../components/header";
import Loading from "../../components/loading";

function Films() {
  const { getComments, comments, searchById, isLoading } = useContext(MovieContext);
  const { id } = useParams()
  const [movie, setMovie] = useState({})
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  const fetchData = async () => {
    const { data } = await searchById(id);
    setMovie(data);
  };
  
  const fetchDataComments = async () => {
    setIsLoadingComments(true);
    await getComments(id);
    setIsLoadingComments(false);
  };

  useEffect(() => {
    fetchData()
    fetchDataComments()
  }, [id])

  return isLoading ? (
    <Loading />
  ) : (
    <div data-testid="films-component">
      <Header />
      <FilmDescription movie={movie} />
      <CarouselNote comments={comments} movieId={id} isLoading={isLoadingComments} />
    </div>
  );
}

export default Films;