import { useContext, useState } from "react";
import { CarouselNote } from "../../components/carouselNote";
import { NewFilms } from "../../components/newFilms";
import { useParams } from "react-router-dom";
import { MovieContext } from "../../contexts/MovieContext";
import { useEffect } from "react";
import HeaderLogin from "../../components/headerLogin";

function Films() {

  const [movies] = useContext(MovieContext);
  const {id} = useParams()
  const [movieSelected, setMovieSelected] = useState({
    title: "",
    src: ""
  })

  useEffect(() => {
    
    const movie = movies.find(item => item._id === id )
 
    setMovieSelected(movie)
 
   console.log("route" + id)
   },[])

   
  return (
    <>
    <HeaderLogin/>
    <NewFilms  movie={movieSelected} />
    <CarouselNote/>
    </>
  );
}

export default Films;