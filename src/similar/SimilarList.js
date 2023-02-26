import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import SimilarSingleMovie from "./SimilarSingleMovie.js";


const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

class SimilarList extends Component {
  
  state = {
    movies: [],
    movie: {},
    moviefetched:undefined,

  };
   

  
  render() 
  {
    //console.log("value is "+this.props.tmdbId);
    if(this.state.moviefetched!==this.props.tmdbId)
    {
      //console.log("fetching")
    if( this.props.tmdbId!==undefined)
    {
      this.random=Math.floor(Math.random() * 100) + 1  ;
     
      const url =`https://api.themoviedb.org/3/movie/${this.props.tmdbId}/similar?api_key=17117ab9c18276d48d8634390c025df4&language=en-US&page=1&include_adult=false`;
  
      fetch(url)
        .then(r => r.json())
        .then(data => {
          //console.log(movies);
          this.setState({ movies: data.results,moviefetched:this.props.tmdbId });
          
        })
        .catch(err => {
          this.setState({movies:[]});
          console.log(err);
        });
      }
    
  }
    
    
      
    const { movies } = this.state;
    const menu = movies.map(movie => {
         

      return (
        
        
        <div className="menu-item" key={movie.id}>
          
          <SimilarSingleMovie movie={movie} />
        </div>
       
      );
    });

    return (
      <div className="lists">
        <h2>{this.props.heading}</h2>
     {/* <SimilarFetch tmdbId={this.props.tmdbId}/> */}
     <br />
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          dragging={true}
          wheel={false}
          alignCenter={false}
          clickWhenDrag={false}
        />
      </div>
    );
  }
}

export default SimilarList;
