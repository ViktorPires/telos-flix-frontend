import { useContext, useState } from "react";
import { CarouselNote } from "../../components/carouselNote";
import { FilmDescription } from "../../components/filmsDescription";
import { useParams } from "react-router-dom";
import { MovieContext } from "../../contexts/MovieContext";
import { CommentContext } from "../../contexts/CommentContext";
import { useEffect } from "react";
import Header from "../../components/header";
import PageLoading from "../../components/pageLoading";

function Films() {
  const { searchById, isLoading } = useContext(MovieContext);
  const { getComments, comments } = useContext(CommentContext);
  const { id } = useParams()
  const [movie, setMovie] = useState({})
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  const fetchData = async () => {
    const data = await searchById(id);
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
    <PageLoading />
  ) : (
    <div data-testid="films-component">
      <Header />
      <FilmDescription movie={movie} />
      <CarouselNote comments={comments} movieId={id} isLoading={isLoadingComments} />
    </div>
  );
}

export default Films;