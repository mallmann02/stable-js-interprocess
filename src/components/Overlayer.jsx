import React from "react";

import '../styles/Overlayer.css';

function Overlayer(props) {
  return (
  	<div className="overlay">
		{ props.children }
	</div>
	);
}

export default Overlayer;
