import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ListsOfMovies from "../movieslist/ListsOfMovies";
import Welcome from 'react-welcome-page'

const Home = () => {
  return (
    <div>
    <Welcome
		loopDuration={4000}
		data={[
		{
		
    image: require('./applogo.PNG') ,
    imageAnimation: 'zoomIn',
    backgroundColor: 'black',
    // textAnimation: "flip",
    //textColor: '#cc0000',
    text:''
 
    }
   
	
	]}

/>
      <Header />

      <ListsOfMovies />
      <Footer />
    </div>
  );
};

export default Home;
