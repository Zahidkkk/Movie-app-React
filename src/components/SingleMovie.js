import {React,useState,useEffect} from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { API_URL } from './context.js';

const SingleMovie = () => {
  const {id} = useParams();

  const[IsLoading, setIsLoading] = useState(true);
  const[movie, setMovie] = useState("");

  const getMovies =async(url)=>{
    setIsLoading(true);
     try{
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      if(data.Response === "True"){
        setIsLoading(false);
        setMovie(data);
      }

     } catch(error){
      console.log(error)
     }
  }

  useEffect(()=>{
    const timeOut = setTimeout(() => {
      getMovies(`${API_URL}&i=${id}`);
    }, 500);
    return() => clearTimeout(timeOut)
  },[id]);

  if(IsLoading){
    return(
      <div className='movie-section'>
        <div className='loading'>Loading...</div>
      </div>
    )
  }

  return (
    <>
    <section className='movie-section'>
      <div className='movie-card'>
        <figure>
          <img src={movie.Poster} alt='poster'/>
        </figure>
        <div className='card-content'>
           <p className='title'>{movie.Title}</p>
           <p className='card-text'><strong>Releases Date :</strong> {movie.Released}</p>
           <p className='card-text'><strong>Genre : </strong>{movie.Genre}</p>
           <p className='card-text'><strong>Language : </strong>{movie.Language}</p>
           <p className='card-text'><strong>Cast : </strong>{movie.Actors}</p>
           <p className='card-text'><strong>Director : </strong>{movie.Director}</p>
           <p className='card-text'><strong>IMDB Ratings : </strong>{movie.imdbRating}/10</p>
           <p className='card-text'><strong>Country : </strong>{movie.Country}</p>
           <NavLink to='/' className='back-btn'>Go Back</NavLink>
        </div>

      </div>
    </section>
    </>
  )
  
}

export default SingleMovie