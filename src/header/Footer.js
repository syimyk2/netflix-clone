import React from "react";
//import { Link, withRouter } from "react-router-dom";
//import "materialize-css/dist/css/materialize.min.css";


const Footer = () => {
  return (
   <>
   <footer className="footer-distributed" style={{background:"black",color:"gray"}}>

<div className="footer-right">


<img
      alt="logo"
            style={{ width: "160px", height: "40px" }}
            src="https://fontmeme.com/permalink/210112/8d0b909f7a074e3bc471a4075716c07e.png"
          />


</div>

<div className="footer-left">

  <p className="footer-links">
    {/* <h3>WatchAnyMovie</h3> */}
    <p style={{color:"grey"}}>A free movie streaming application built by Amol Dalwai</p>
  </p>

  <p ><span style={{color:"#cc0000"}}>Amol Dalwai</span> &copy; 2021</p>
</div>

</footer>
       
   </>
    
  );
};

export default Footer;
