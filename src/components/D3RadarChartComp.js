import React, { Component } from "react";
import * as d3 from "d3";

import radar from "./D3RadarChart";

import "./D3RadarChart.css";

class D3RadarChartComp extends Component {

	componentDidMount = () => {
		//
		// This should fetch data from an API and then graph away...
		//
		this.radarChart();
	}

	radarChart = () => {

		/* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */

		//////////////////////////////////////////////////////////////
		////////////////////////// Data //////////////////////////////
		//////////////////////////////////////////////////////////////

		//
		// This is just hardcoded. When used for real this is the structure of the data. 
		// One minor issue right now is that the "Label iPhone, Samsung, Nokia" does not show up

		var data = [
			[
				//iPhone
				{ axis: "Battery Life", value: 0.22 },
				{ axis: "Brand", value: 0.28 },
				{ axis: "Contract Cost", value: 0.29 },
				{ axis: "Design And Quality", value: 0.17 },
				{ axis: "Have Internet Connectivity", value: 0.22 },
				{ axis: "Large Screen", value: 0.02 },
				{ axis: "Price Of Device", value: 0.21 },
				{ axis: "To Be A Smartphone", value: 0.5 }
			],
			[
				//Samsung
				{ axis: "Battery Life", value: 0.27 },
				{ axis: "Brand", value: 0.16 },
				{ axis: "Contract Cost", value: 0.35 },
				{ axis: "Design And Quality", value: 0.13 },
				{ axis: "Have Internet Connectivity", value: 0.2 },
				{ axis: "Large Screen", value: 0.13 },
				{ axis: "Price Of Device", value: 0.35 },
				{ axis: "To Be A Smartphone", value: 0.38 }
			],
			[
				//Nokia Smartphone
				{ axis: "Battery Life", value: 0.26 },
				{ axis: "Brand", value: 0.1 },
				{ axis: "Contract Cost", value: 0.3 },
				{ axis: "Design And Quality", value: 0.14 },
				{ axis: "Have Internet Connectivity", value: 0.22 },
				{ axis: "Large Screen", value: 0.04 },
				{ axis: "Price Of Device", value: 0.41 },
				{ axis: "To Be A Smartphone", value: 0.3 }
			]
		];
		
		//////////////////////////////////////////////////////////////
		//////////////////////// Set-Up //////////////////////////////
		//////////////////////////////////////////////////////////////

		var margin = { top: 100, right: 100, bottom: 100, left: 100 },
			width =
				Math.min(700, window.innerWidth - 10) -
				margin.left -
				margin.right,
			height = Math.min(
				width,
				window.innerHeight - margin.top - margin.bottom - 20
			);

		//////////////////////////////////////////////////////////////
		//////////////////// Draw the Chart //////////////////////////
		//////////////////////////////////////////////////////////////

		// var color = d3.scale
		var color = d3.scaleOrdinal(["#EDC951", "#CC333F", "#00A0B0"]);
		// .range(["#EDC951", "#CC333F", "#00A0B0"]);

		var radarChartOptions = {
			w: width,
			h: height,
			margin: margin,
			maxValue: 0.5,
			levels: 5,
			roundStrokes: true,
			color: color
		};
		//Call function to draw the Radar chart
		radar.radarChart(".radarChart", data, radarChartOptions);

	}

	/**
	 * Take note of the CSS which renders all the nice fonts that can be found at:
	 */

	render() {
		return (
			<div>
				<h3>D3RadarChartComp</h3>
				<div className="radarChart"></div>
			</div>
		);
	}
}

export default D3RadarChartComp;