import * as React from 'react';

function ClusterMap() {
	const styleA = "c0-0.6,0.5-1,1-1h14c0.5,0,1,0.4,1,1v14c0,0.5-0.5,1-1,1H";
	const styleB = "c-0.5,0-1-0.5-1-1V";

	const genShape = (x, y) => {
		return (`M${x.toString()},${y.toString()}${styleA}${(x + 1).toString()}${styleB}${y.toString()}z`)
	}
  	return (
		<svg version="1.1" id="Cluster_3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 175 560">
      		<g id="c2r1">
				<path id="c2r1s1" className="station" d={genShape(9, 605)}/>
				<path id="c2r1s2" className="station" d={genShape(26, 602)}/>
				<path id="c2r1s3" className="station" d={genShape(43, 605)}/>
				<path id="c2r1s4" className="station" d={genShape(60, 602)}/>
				<path id="c2r1s5" className="station" d={genShape(77, 605)}/>
				<path id="c2r1s6" className="station" d={genShape(94, 602)}/>
			</g>
      		<g id="c2r2">
				<path id="c2r2s1" className="station" d={genShape(9, 573)}/>
				<path id="c2r2s2" className="station" d={genShape(26, 570)}/>
				<path id="c2r2s3" className="station" d={genShape(43, 573)}/>
				<path id="c2r2s4" className="station" d={genShape(60, 570)}/>
				<path id="c2r2s5" className="station" d={genShape(77, 573)}/>
				<path id="c2r2s6" className="station" d={genShape(94, 570)}/>
			</g>
      		<g id="c2r3">
				<path id="c2r3s1" className="station" d={genShape(9, 541)}/>
				<path id="c2r3s2" className="station" d={genShape(26, 538)}/>
				<path id="c2r3s3" className="station" d={genShape(43, 541)}/>
				<path id="c2r3s4" className="station" d={genShape(60, 538)}/>
				<path id="c2r3s5" className="station" d={genShape(77, 541)}/>
				<path id="c2r3s6" className="station" d={genShape(94, 538)}/>
			</g>
      		<g id="c2r4">
				<path id="c2r4s1" className="station" d={genShape(9, 508)}/>
				<path id="c2r4s2" className="station" d={genShape(26, 505)}/>
				<path id="c2r4s3" className="station" d={genShape(43, 508)}/>
				<path id="c2r4s4" className="station" d={genShape(60, 505)}/>
				<path id="c2r4s5" className="station" d={genShape(77, 508)}/>
				<path id="c2r4s6" className="station" d={genShape(94, 505)}/>
			</g>
      		<g id="c2r5">
				<path id="c2r5s1" className="station" d={genShape(9, 475)}/>
				<path id="c2r5s2" className="station" d={genShape(26, 472)}/>
				<path id="c2r5s3" className="station" d={genShape(43, 475)}/>
				<path id="c2r5s4" className="station" d={genShape(60, 472)}/>
				<path id="c2r5s5" className="station" d={genShape(77, 475)}/>
				<path id="c2r5s6" className="station" d={genShape(94, 472)}/>
			</g>
			<g id="c2r6">
				<path id="c2r6s1" className="station" d={genShape(9, 442)}/>
				<path id="c2r6s2" className="station" d={genShape(26, 439)}/>
				<path id="c2r6s3" className="station" d={genShape(43, 442)}/>
				<path id="c2r6s4" className="station" d={genShape(60, 439)}/>
				<path id="c2r6s5" className="station" d={genShape(77, 442)}/>
				<path id="c2r6s6" className="station" d={genShape(94, 439)}/>
			</g>
			<g id="c2r7">
				<path id="c2r7s1" className="station" d={genShape(9, 409)}/>
				<path id="c2r7s2" className="station" d={genShape(26, 406)}/>
				<path id="c2r7s3" className="station" d={genShape(43, 409)}/>
				<path id="c2r7s4" className="station" d={genShape(60, 406)}/>
				<path id="c2r7s5" className="station" d={genShape(77, 409)}/>
				<path id="c2r7s6" className="station" d={genShape(94, 406)}/>
			</g>
			<g id="c2r8">
				<path id="c2r8s1" className="station" d={genShape(9, 376)}/>
				<path id="c2r8s2" className="station" d={genShape(26, 373)}/>
				<path id="c2r8s3" className="station" d={genShape(43, 376)}/>
				<path id="c2r8s4" className="station" d={genShape(60, 373)}/>
				<path id="c2r8s5" className="station" d={genShape(77, 376)}/>
				<path id="c2r8s6" className="station" d={genShape(94, 373)}/>
			</g>
			<g id="c2r9">
				<path id="c2r9s1" className="station" d={genShape(9, 343)}/>
				<path id="c2r9s2" className="station" d={genShape(26, 340)}/>
				<path id="c2r9s3" className="station" d={genShape(43, 343)}/>
				<path id="c2r9s4" className="station" d={genShape(60, 340)}/>
				<path id="c2r9s5" className="station" d={genShape(77, 343)}/>
				<path id="c2r9s6" className="station" d={genShape(94, 340)}/>
			</g>
			<g id="c2r10">
				<path id="c2r10s1" className="station" d={genShape(9, 310)}/>
				<path id="c2r10s2" className="station" d={genShape(26, 307)}/>
				<path id="c2r10s3" className="station" d={genShape(43, 310)}/>
				<path id="c2r10s4" className="station" d={genShape(60, 307)}/>
				<path id="c2r10s5" className="station" d={genShape(77, 310)}/>
				<path id="c2r10s6" className="station" d={genShape(94, 307)}/>
			</g>
			<g id="c2r11">
				<path id="c2r11s1" className="station" d={genShape(9, 277)}/>
				<path id="c2r11s2" className="station" d={genShape(26, 274)}/>
				<path id="c2r11s3" className="station" d={genShape(43, 277)}/>
				<path id="c2r11s4" className="station" d={genShape(60, 274)}/>
				<path id="c2r11s5" className="station" d={genShape(77, 277)}/>
				<path id="c2r11s6" className="station" d={genShape(94, 274)}/>
			</g>
			<g id="c2r12">
				<path id="c2r12s1" className="station" d={genShape(9, 244)}/>
				<path id="c2r12s2" className="station" d={genShape(26, 241)}/>
				<path id="c2r12s3" className="station" d={genShape(43, 244)}/>
				<path id="c2r12s4" className="station" d={genShape(60, 241)}/>
				<path id="c2r12s5" className="station" d={genShape(77, 244)}/>
				<path id="c2r12s6" className="station" d={genShape(94, 241)}/>
			</g>
			<g id="c2r13">
				<path id="c2r13s1" className="station" d={genShape(9, 211)}/>
				<path id="c2r13s2" className="station" d={genShape(26, 208)}/>
				<path id="c2r13s3" className="station" d={genShape(43, 211)}/>
				<path id="c2r13s4" className="station" d={genShape(60, 208)}/>
				<path id="c2r13s5" className="station" d={genShape(77, 211)}/>
				<path id="c2r13s6" className="station" d={genShape(94, 208)}/>
			</g>
			<g id="c2r14">
				<path id="c2r14s1" className="station" d={genShape(9, 178)}/>
				<path id="c2r14s2" className="station" d={genShape(26, 175)}/>
				<path id="c2r14s3" className="station" d={genShape(43, 178)}/>
				<path id="c2r14s4" className="station" d={genShape(60, 175)}/>
				<path id="c2r14s5" className="station" d={genShape(77, 178)}/>
				<path id="c2r14s6" className="station" d={genShape(94, 175)}/>
			</g>
			<g id="c2r15">
				<path id="c2r15s1" className="station" d={genShape(9, 145)}/>
				<path id="c2r15s2" className="station" d={genShape(26, 142)}/>
				<path id="c2r15s3" className="station" d={genShape(43, 145)}/>
				<path id="c2r15s4" className="station" d={genShape(60, 142)}/>
				<path id="c2r15s5" className="station" d={genShape(77, 145)}/>
				<path id="c2r15s6" className="station" d={genShape(94, 142)}/>
			</g>
			<g id="c2r16">
				<path id="c2r16s1" className="station" d={genShape(9, 112)}/>
				<path id="c2r16s2" className="station" d={genShape(26, 109)}/>
				<path id="c2r16s3" className="station" d={genShape(43, 112)}/>
				<path id="c2r16s4" className="station" d={genShape(60, 109)}/>
				<path id="c2r16s5" className="station" d={genShape(77, 112)}/>
				<path id="c2r16s6" className="station" d={genShape(94, 109)}/>
			</g>
			<g id="c2r17">
				<path id="c2r17s1" className="station" d={genShape(9, 79)}/>
				<path id="c2r17s2" className="station" d={genShape(26, 76)}/>
				<path id="c2r17s3" className="station" d={genShape(43, 79)}/>
				<path id="c2r17s4" className="station" d={genShape(60, 76)}/>
				<path id="c2r17s5" className="station" d={genShape(77, 79)}/>
				<path id="c2r17s6" className="station" d={genShape(94, 76)}/>
			</g>
			<g id="c2r18">
				<path id="c2r18s1" className="station" d={genShape(9, 46)}/>
				<path id="c2r18s2" className="station" d={genShape(26, 43)}/>
				<path id="c2r18s3" className="station" d={genShape(43, 46)}/>
				<path id="c2r18s4" className="station" d={genShape(60, 43)}/>
				<path id="c2r18s5" className="station" d={genShape(77, 46)}/>
				<path id="c2r18s6" className="station" d={genShape(94, 43)}/>
			</g>
			<g id="c2r19">
				<path id="c2r19s1" className="station" d={genShape(9, 14)}/>
				<path id="c2r19s2" className="station" d={genShape(26, 11)}/>
				<path id="c2r19s3" className="station" d={genShape(43, 14)}/>
				<path id="c2r19s4" className="station" d={genShape(60, 11)}/>
				<path id="c2r19s5" className="station" d={genShape(77, 14)}/>
				<path id="c2r19s6" className="station" d={genShape(94, 11)}/>
			</g>
			
			<g id="c1">
				<text transform="matrix(1 0 0 1 130 27)" className="row-name">R19</text>
				<text transform="matrix(1 0 0 1 130 59)" className="row-name">R18</text>
				<text transform="matrix(1 0 0 1 130 92)" className="row-name">R17</text>
				<text transform="matrix(1 0 0 1 130 125)" className="row-name">R16</text>
				<text transform="matrix(1 0 0 1 130 158)" className="row-name">R15</text>
				<text transform="matrix(1 0 0 1 130 191)" className="row-name">R14</text>
				<text transform="matrix(1 0 0 1 130 224)" className="row-name">R13</text>
				<text transform="matrix(1 0 0 1 130 257)" className="row-name">R12</text>
				<text transform="matrix(1 0 0 1 130 290)" className="row-name">R11</text>
				<text transform="matrix(1 0 0 1 130 323)" className="row-name">R10</text>
				<text transform="matrix(1 0 0 1 130 356)" className="row-name">R9</text>
				<text transform="matrix(1 0 0 1 130 389)" className="row-name">R8</text>
				<text transform="matrix(1 0 0 1 130 422)" className="row-name">R7</text>
				<text transform="matrix(1 0 0 1 130 455)" className="row-name">R6</text>
				<text transform="matrix(1 0 0 1 130 488)" className="row-name">R5</text>
				<text transform="matrix(1 0 0 1 130 521)" className="row-name">R4</text>
				<text transform="matrix(1 0 0 1 130 554)" className="row-name">R3</text>
				<text transform="matrix(1 0 0 1 130 589)" className="row-name">R2</text>
				<text transform="matrix(1 0 0 1 130 622)" className="row-name">R1</text>
			</g>
		</svg>
	);
}

export default ClusterMap;