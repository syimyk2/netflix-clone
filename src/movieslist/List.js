import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import SingleMovie from "./SingleMovie.js";

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

class List extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
  }
  state = {
    movies: [],
    movie: {}
  };

  componentDidMount() {
    this.mounted = true;
    this.random=Math.floor(Math.random() * 100) + 1  ;
    const url =
      typeof this.props.apiCall === "number"
        ? `https://api.themoviedb.org/3/discover/movie?api_key=17117ab9c18276d48d8634390c025df4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${
            this.props.apiCall
          }&page=${this.random}&include_adult=false`
        : `https://api.themoviedb.org/3/movie/${this.props.apiCall}?api_key=17117ab9c18276d48d8634390c025df4&language=en-US&page=1&include_adult=false`;

    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (this.mounted) this.setState({ movies: data.results });
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { movies ,random} = this.state;
    const menu = movies.map(movie => {
      return (
        <div className="menu-item" key={movie.id}>
          <SingleMovie movie={movie} />
        </div>
      );
    });

    return (
      
      <div className="lists" >
        <br/>
      <div style={{marginLeft:"20px",marginBottom:"-50px",width:"8px",height:"40px",backgroundColor:"red"}}/> <h2 style={{marginLeft:"25px"}}>{this.props.heading}</h2><br/>
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

export default List;
