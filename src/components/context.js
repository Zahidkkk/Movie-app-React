//Context API is use to transfer the data from parent to child.
/*we need three things to create context API 
1) Context (like warehouse) 
2)Provider(like delivery) and 
3) consumer (useContext)*/
//context API to fetch the API data and useContext is a hooks

//Always wrap the App in index.js with AppProvider to get the data.

import React, { useContext, useEffect, useState } from "react";

//API URL

export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

//context
const AppContext = React.createContext();

//provider
const AppProvider = ({children}) => {

  const[IsLoading, setIsLoading] = useState(true);
  const[movie, setMovie] = useState([]);
  const[isError, setIsError] = useState({show: "false",msg:""});
  const[query, setQuery] = useState("Titanic");

  const getMovies =async(url)=>{
    setIsLoading(true);
     try{
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      if(data.Response === "True"){
        setIsLoading(false);
        setIsError({
          show: false,
          msg: '',
        });
        setMovie(data.Search);
      }else{
        setIsError({
          show: true,
          msg: data.Error,
        });
      }
     } catch(error){
      console.log(error)
     }
  }

  useEffect(()=>{
    const timeOut = setTimeout(() => {
      getMovies(`${API_URL}&s=${query}`);
    }, 500);
    return() => clearTimeout(timeOut)
  },[query])

  return <AppContext.Provider value={{IsLoading,movie,isError,query,setQuery}}>{children}</AppContext.Provider>
};

//global custom hook
const useGlobalContext = ()=>{
  return useContext(AppContext)
};

export { AppContext, AppProvider, useGlobalContext }

