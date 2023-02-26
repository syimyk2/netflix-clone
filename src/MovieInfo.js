import React, { Component } from "react";
import Navbar from "./header/Navbar";
import Footer from "./header/Footer";
import PlayMovie from "./header/PlayMovie";
import Dialog from "@material-ui/core/Dialog";
import SimilarListsOfMovies from "./similar/SimilarListsOfMovies";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Animated } from "react-animated-css";

export default class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.open = false;
  }

  state = {
    movie: {},
    credits: [],
    video: []
  };

  fetchMovie = () => {
    const urlMovie = fetch(
      `https://api.themoviedb.org/3/movie/${this.props.match.params.movie_id}?api_key=17117ab9c18276d48d8634390c025df4&language=en-US`
    );
    const urlCredits = fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.movie_id}/credits?api_key=17117ab9c18276d48d8634390c025df4
        `);
    const urlVideos = fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.movie_id}/videos?api_key=17117ab9c18276d48d8634390c025df4
          `);
    const urls = [urlMovie, urlCredits, urlVideos];

    Promise.all(urls)
      .then(([r1, r2, r3]) => Promise.all([r1.json(), r2.json(), r3.json()]))
      .then(([data1, data2, data3]) => {
        if (this.mounted)
          this.setState({
            movie: data1,
            credits: data2,
            video: data3.results
          });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.mounted = true;

    this.fetchMovie();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.fetchMovie();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  time_convert = (num) => {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}h ${minutes}min`;
  };

  render() {
    const { movie, credits, video } = this.state;

    const backgroundImg = {
      backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0) 60%), url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`
    };

    const backwithPoster = {
      backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.8) 60%), url("https://image.tmdb.org/t/p/original/${movie.poster_path}")`
    };

    const content =
      Object.keys(movie).length > 0 ? (
        <div
          style={movie.backdrop_path !== null ? backgroundImg : backwithPoster}
          className="bgImage"
        >
          {/* null?=backgroundImg  : backwithPoster */}
          <div className="content">
            <Animated animationIn="fadeInDown" isVisible={true}>
              <h1>{movie.title}</h1>
            </Animated>

            <p className="year-run-vote">
              <span className="year">
                {new Date(movie.release_date).getFullYear()}
              </span>
              <span className="run">
                {" "}
                {movie.runtime && this.time_convert(movie.runtime)}
              </span>
              <span className="vote">
                <img
                  src={require("./header/imdb_logo.png")}
                  alt="Rating"
                  style={{
                    width: "40px",
                    height: "20px",
                    marginBottom: "-5px"
                  }}
                />{" "}
                {movie.vote_average}
              </span>
            </p>
            <div className="overview-container">
              <Animated animationIn="fadeInUp" isVisible={true}>
                <p className="overview">{movie.overview}</p>
              </Animated>

              <p>
                {/* <span className="greyed">Starring: </span>
                {credits.cast &&
                  credits.cast.map((cast, i) => {
                    if (i < 4)
                      return <span key={cast.cast_id}>{cast.name}, </span>;
                    if (i === 4)
                      return <span key={cast.cast_id}>{cast.name}</span>;
                    else return null;
                  })} */}
              </p>

              <p>
                <span className="greyed">Genres: </span>
                {movie.genres.map((genre, i, arr) => {
                  if (i === arr.length - 1)
                    return <span key={genre.id}>{genre.name}</span>;
                  return <span key={genre.id}>{genre.name}, </span>;
                })}
              </p>

              {credits && credits.crew.length > 0 && (
                <>
                  <p>
                    <span className="greyed">Director: </span>{" "}
                    {credits.crew[0].name}
                  </p>
                </>
              )}
            </div>
          </div>
          <PlayMovie
            imdb_id={movie.imdb_id}
            movie_title={movie.title}
            tmdb_id={movie.id}
            movie_img={movie.backdrop_path}
            movie_year={new Date(movie.release_date).getFullYear()}
          />
          <br />
          {/* <Button
            variant="outlined"
            style={{
              width: "250px",
              padding: "15px",
              marginTop: "-50px",
              borderWidth:"1px",
              borderColor:"white",
              color: "white",
              marginLeft: "10px"
            }}
          >
            Trailer
          </Button> */}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>
          <CircularProgress color="secondary" />
        </p>
      );
    //console.log(movie);
    return (
      <div>
        <Navbar />

        <div className="movie-page">
          {content}
          <Dialog fullScreen open={false}>
            <PlayMovie />
          </Dialog>
        </div>
        <br />
        {/* <div className="lists" >
          
        <h2 >Details</h2>
        <br/>
        <h3 style={{marginLeft:"5vw"}}>Budget: <span style={{color:"gray"}}>{movie.budget}</span> USD</h3>
        <h3 style={{marginLeft:"5vw"}}>Language: <span style={{color:"gray"}}>{movie.original_language}</span> </h3>
        </div> */}
        <br />
        <div className="lists">
          <div
            style={{
              marginLeft: "20px",
              marginBottom: "-50px",
              width: "8px",
              height: "40px",
              backgroundColor: "red"
            }}
          />
          <h2 style={{ marginLeft: "25px" }}>Trailer</h2>
          <br />

          {video.length ? (
            <div className="video">
              <iframe
                src={`https://www.youtube.com/embed/${video[0].key}`}
                title={video[0].name}
                frameBorder="0"
                allowFullScreen
                style={{ marginLeft: "45px" }}
              />
            </div>
          ) : null}
        </div>
        <br />
        <br />
        <div className="lists">
          <div
            style={{
              marginLeft: "20px",
              marginBottom: "-50px",
              width: "8px",
              height: "40px",
              backgroundColor: "red"
            }}
          />
          <h2 style={{ marginLeft: "25px" }}>Cast</h2>
          <br />
          <div
            className="hidescroll"
            style={{
              marginLeft: "45px",
              overflow: "auto",
              whiteSpace: "nowrap"
            }}
          >
            {credits.cast &&
              credits.cast.map((cast, i) => {
                if (i < 4)
                  return (
                    <span key={cast.cast_id}>
                      <img
                        alt={cast.cast_id}
                        style={{
                          width: "115px",
                          height: "120px",
                          marginRight: "15px",
                          borderRadius: "100%"
                        }}
                        src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                      />
                    </span>
                  );
                if (i === 4)
                  return (
                    <span key={cast.cast_id}>
                      <img
                        alt={cast.cast_id}
                        style={{
                          width: "115px",
                          height: "120px",
                          marginRight: "15px",
                          borderRadius: "100%",
                          border: "1px solid gray"
                          // backgroundImage: "url("+"https://storage.needpix.com/thumbs/blank-profile-picture-973460_1280.png"+")"
                        }}
                        src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                      />
                    </span>
                  );
                else return null;
              })}
          </div>
        </div>
        <br />
        <br />
        <SimilarListsOfMovies tmdbId={movie.id} />
        <br />

        <Footer />
      </div>
    );
  }
}
