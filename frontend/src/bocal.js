import * as React from 'react';

function Bocal() {
	const styleA = "c0-0.6,0.5-1,1-1h14c0.5,0,1,0.4,1,1v14c0,0.5-0.5,1-1,1H";
	const styleB = "c-0.5,0-1-0.5-1-1V";

	const genShape = (x, y) => {
		return (`M${x.toString()},${y.toString()}${styleA}${(x + 1).toString()}${styleB}${y.toString()}z`)
	}
  	return (
		<svg version="1.1" id="Bocal" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 175 470">
			<g id="bocal">
				<path id="bocal-01" className="station" d={genShape(9, 14)}/>
				<path id="bocal-02" className="station" d={genShape(26, 11)}/>
				<path id="bocal-03" className="station" d={genShape(43, 14)}/>
			</g>
		</svg>
	);
}

export default Bocal;