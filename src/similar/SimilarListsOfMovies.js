import React from "react";
import SimilarList from "./SimilarList";
// const movies = {
//   upcoming: {
//     apiCall: "upcoming",
//     header: "Recommendations",
//     
//   }
// };


const SimilarListsOfMovies = (props) => {
   
  //const [id,setid]=React.useState("{props.tmdbId}");


  const movies = {
    upcoming: {
      apiCall: "upcoming",
      header: "Recommendations",
      
    }
  };


  
  return (
    <div>
      {/* is:{id} */}
      {Object.keys(movies).map((item, i) => (
        <div key={i}>
          <SimilarList  tmdbId={props.tmdbId} heading={movies[item].header} apiCall={movies[item].apiCall} />
        </div>
      ))}
    </div>
  );
};

export default SimilarListsOfMovies;
