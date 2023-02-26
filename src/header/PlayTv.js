import React from "react";
import axios from "axios";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
//import ScriptTag from 'react-script-tag';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import HighQualityIcon from "@material-ui/icons/HighQuality";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
//import './Netflix.gif'

export default function PlayTv(props) {
  const [open, setOpen] = React.useState(false);
  //const [openSeries, setOpenSeries] = React.useState(false);
  const [serieslink, setserieslink] = React.useState();
  const [season, setseason] = React.useState("1");
  //const [episode,setepisode]=React.useState("1");
  // const [seasonep,setseasonep]=React.useState(props.movie_seasons)

  const handleClickOpen = () => {
    setOpen(true);

    setserieslink(
      //`javascript:window.location.replace("https://gomo.to/show/${props.imdb_id}/01-01")`
      //` https://moviehungershaven.xyz/itv/tvs1.php?imdbid=${props.imval}&season=1&episode=1`
      //`https://fsapi.xyz/tv-tmdb/${props.tmdb_id}-1-1`
      `https://www.2embed.ru/embed/tmdb/tv?id=${props.tmdb_id}&s=1&e=1`
    );
  };

  const handleClose = () => {
    setOpen(false);
    setseason("1");
  };
  // console.log("number of seasons"+props.seasons_count);
  // setepcount(seasonep[season].episode_count);
  // console.log("episode count"+props.movie_seasons[season].episode_count);
  //search for season number
  //console.log(props.movie_seasons[0].season_number);

  let movie_seasons = props.movie_seasons;
  if (movie_seasons[0].season_number === 0) {
    movie_seasons = movie_seasons.slice(1, movie_seasons.length);
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={{
          width: "250px",
          padding: "15px",
          marginTop: "-150px",
          background: "#cc0000",
          color: "white",
          marginLeft: "10px"
        }}
      >
        <PlayArrowIcon />
        &nbsp;&nbsp; Play
      </Button>
      <Dialog fullScreen open={open}>
        {/* <p>This is tv show player {props.imdb_id}</p> */}
        <iframe
          src={serieslink}
          title="movieServer"
          width="100%"
          height="100%"
          id="myId"
          className="playerBack"
          style={{ border: "none" }}
          //sandbox="allow-same-origin allow-scripts  allow-forms"
        />
        {/* for seasons */}
        <select
          defaultValue={season}
          onChange={(event) => {
            setseason(event.target.value);
          }}
          style={{
            position: "absolute",
            top: "5px",
            left: "25vw",
            color: "white",
            width: "90px",
            height: "50px",
            background: "rgb(0,0,0,0.5)",
            padding: "5px",
            borderRadius: "5px"
          }}
        >
          {/* <option  selected="selected">Season </option> */}
          {[...Array(movie_seasons.length)].map((e, i) => (
            <option value={movie_seasons[i].season_number} key={i}>
              Season{movie_seasons[i].season_number}
            </option>
          ))}
          {/* <option value="1" >Season 1</option>
            <option value="2" >Season 2</option>
            <option value="3" >Season 3</option>
            <option value="4" >Season 4</option>
            <option value="5" >Season 5</option>
            <option value="6" >Season 6</option>
            <option value="7" >Season 7</option>
            <option value="8" >Season 8</option>
            <option value="9" >Season 9</option>
            <option value="10" >Season 10</option> */}
        </select>
        {/* for  episode */}
        <select
          value={serieslink} //https://www.2embed.ru/embed/tmdb/tv?id=${props.tmdb_id}&s=1&e=1
          //onChange={ (event)=>{setserieslink(`https://fsapi.xyz/tv-tmdb/`+`${props.tmdb_id}-`+`${season}`+`-`+event.target.value );}}
          onChange={(event) => {
            setserieslink(
              `https://www.2embed.ru/embed/tmdb/tv?id=` +
                `${props.tmdb_id}&s=` +
                `${season}` +
                `&e=` +
                event.target.value
            );
          }}
          //onChange={ (event)=>{setserieslink(`https://moviehungershaven.xyz/itv/tvs1.php?imdbid=`+`${props.imdb_id}&season=`+`${season}&episode=`+event.target.value );}}
          style={{
            position: "absolute",
            top: "5px",
            right: "12vw",
            color: "white",
            width: "90px",
            height: "50px",
            background: "rgb(0,0,0,0.5)",
            padding: "5px",
            borderRadius: "5px"
          }}
        >
          {[
            ...Array(
              movie_seasons[season - movie_seasons[0].season_number]
                .episode_count
            )
          ].map((e, i) => (
            <option value={i + 1} key={i}>
              Episode {i + 1}
            </option>
          ))}
          {/* <option value="1" >Ep 1</option>
            <option value="2" >Ep 2</option>
            <option value="3" >Ep 3</option>
            <option value="4" >Ep 4</option>
            <option value="5" >Ep 5</option>
            <option value="6" >Ep 6</option>
            <option value="7" >Ep 7</option>
            <option value="8" >Ep 8</option>
            <option value="9" >Ep 9</option>
            <option value="10" >Ep 10</option> */}
        </select>

        <IconButton
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "5px",
            left: "5px",
            color: "white",
            width: "60px",
            height: "60px",
            background: "rgb(0,0,0,0.5)",
            borderRadius: "100%"
          }}
        >
          <ArrowBackIcon fontSize="large" />
        </IconButton>
      </Dialog>
    </>
  );
}
