import * as React from 'react';

function Bocal() {
	const styleA = "c0-0.6,0.5-1,1-1h14c0.5,0,1,0.4,1,1v14c0,0.5-0.5,1-1,1H";
	const styleB = "c-0.5,0-1-0.5-1-1V";

	const genShape = (x, y) => {
		return (`M${x.toString()},${y.toString()}${styleA}${(x + 1).toString()}${styleB}${y.toString()}z`)
	}
  	return (
		<svg version="1.1" id="Bocal" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 175 400">
			<g id="bocal">
				<path id="bocal-01" className="station" d={genShape(40, 14)}/>
				<path id="bocal-02" className="station" d={genShape(40, 46)}/>
				<path id="bocal-03" className="station" d={genShape(40, 78)}/>
			</g>
			<g id="c1">
				<text transform="matrix(1 0 0 1 60 27)" className="row-name">01</text>
				<text transform="matrix(1 0 0 1 60 59)" className="row-name">02</text>
				<text transform="matrix(1 0 0 1 60 92)" className="row-name">03</text>
			</g>
		</svg>
	);
}

export default Bocal;