import React from "react";
import SimilarListTv from "./SimilarListTv";
// const movies = {
//   upcoming: {
//     apiCall: "upcoming",
//     header: "Recommendations",
//     
//   }
// };


const SimilarListsOfTv = (props) => {
   
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
          <SimilarListTv  tmdbId={props.tmdbId} heading={movies[item].header} apiCall={movies[item].apiCall} />
        </div>
      ))}
    </div>
  );
};

export default SimilarListsOfTv;
