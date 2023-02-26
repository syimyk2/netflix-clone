import React, { Component } from "react";
import Animate from "react-smooth";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

class Header extends Component {
  constructor(props) {
    super(props);
    this.showcaseMovies = 3;
    this.timeoutTime = 5000;
    this.mounted = false;
  }
  state = {
    movies: [],
    i: 0
  };

  componentDidMount() {
    this.mounted = true;
    this.random=Math.floor(Math.random() * 100) + 1  ;
    //console.log(this.random);
    fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=17117ab9c18276d48d8634390c025df4&language=en-US&include_adult=false&page=${this.random}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.mounted) this.setState({ movies: data.results });
      })
      .catch(err => console.log(err));
    this.startTimeout();
  }

  startTimeout = () => {
    this.timeout = setTimeout(() => {
      if (this.state.i < this.showcaseMovies)
        this.setState({ i: this.state.i + 1 });
      else this.setState({ i: 0 });
      this.startTimeout();
    }, this.timeoutTime);
  };

  componentWillUnmount() {
    this.mounted = false;
    clearTimeout(this.timeout);
  }

  render() {
    const { movies, i ,random} = this.state;

    const divs = movies.length
      ? movies.map((movie, index) => {
          if (index <= this.showcaseMovies) {
            return (
              <div
                key={index}
                className={i === index ? "active" : null}
                onClick={() =>
                  this.setState({ i: index }, () => {
                    clearTimeout(this.timeout);
                    this.startTimeout();
                  })
                }
              />
            );
          } else return null;
        })
      : null;

    const moviesList = movies.length ? (
      <div key={movies[i].id}>
        <Animate to="1" from="0.2" attributeName="opacity">
          <div
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0) 60%), url("https://image.tmdb.org/t/p/original/${
                movies[i].backdrop_path
              }")`
            }}
            className="bgImage"
          >
            <div className="popularInfo">
              <h1>{movies[i].title}</h1>
              <p className="rating">
                <em><img src={require('./imdb_logo.png')} alt="Rating" style={{width:"40px", height:"20px",marginBottom:"-5px"}}/> {movies[i].vote_average}</em>
              </p>
              <p className="release-date">
                Release Date: {new Date(movies[i].release_date).toDateString()}
              </p>
              <p className="header-overview">{movies[i].overview}</p>
              <Link to={"/" + movies[i].id}>
                {/* <button> Play</button> */}
                <Button
           variant="contained"
           
           style={{
             width: "150px",
             padding: "15px",
             fontSize:"12px",
             borderColor:"white",
             background: "white",
             color: "black",
            
           }}>
             <PlayArrowIcon /><b>
             &nbsp;&nbsp;
             Play</b></Button>
                
              </Link>
            </div>
            <div className="switchImg">{divs}</div>
          </div>
        </Animate>
      </div>
    ) : (
      <h4>Loading</h4>
    );

    return (
      <header>
        <Navbar />
        <div className="popular">{moviesList}</div>
      </header>
    );
  }
}
export default Header;
