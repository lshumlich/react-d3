import React, { Component } from "react";
import * as d3 from 'd3'
import D3Histogram from "./D3Histogram";
import D3Radar from "./D3RadarChart";


import "./D3Combo.css";

class D3ComboComp extends Component {

    constructor() {
        super();
        this.histogram = new D3Histogram();
    }

    componentDidMount = () => {
        //
        // This method should fetch data from an API and then graph away...
        //
        this.drawHistogram();
        this.radarChart();
    }

    drawHistogram = () => {
        // Generate 1000 data points using normal distribution with mean=20, deviation=5
        // const values = d3.range(1000).map(d3.randomNormal(20, 5));
        const options = {
            ticks: 20,
            color: "steelblue",
            format: ",.0f",
            width: 250,
            height: 150,
            // min: 0,
            // max: 10,
        }
        const values1 = [1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10, 10, 10, 11, 11, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        const values2 = [1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        const values3 = [1, 6, 7, 8, 9, 9, 9, 9, 9, 9, 10, 11, 12, 12, 12, 13, 14, 15, 15, 15, 16, 17, 18, 19];

        this.histogram.drawHistogram('#histogram1', values1, options);
        this.histogram.drawHistogram('#histogram2', values2, options);
        this.histogram.drawHistogram('#histogram3', values3, options);
    }


    radarChart = () => {

        /* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */

        //////////////////////////////////////////////////////////////
        ////////////////////////// Data //////////////////////////////
        //////////////////////////////////////////////////////////////

        //
        // This is just hardcoded. When used for real, this is the structure of the data. 
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
        //////////////////// Draw the Chart //////////////////////////
        //////////////////////////////////////////////////////////////

        // var color = d3.scale
        var color = d3.scaleOrdinal(["#EDC951", "#CC333F", "#00A0B0"]);
        // .range(["#EDC951", "#CC333F", "#00A0B0"]);

        var radarChartOptions = {
            w: 250,
            h: 250,
            // margin: margin,
            maxValue: 0.5,
            levels: 5,
            roundStrokes: true,
            color: color
        };


        //Call function to draw the Radar chart
        D3Radar.radarChart("#radarChart1", data, radarChartOptions);
        D3Radar.radarChart("#radarChart2", data, radarChartOptions);
        D3Radar.radarChart("#radarChart3", data, radarChartOptions);

    }


    refresh = () => {
        console.log('JK');
    }

    render() {
        return (
            <React.Fragment>
                <h3>D3ComboComp</h3>
                <p onClick={this.refresh} className="pacifico">Refresh the data.</p>

                <div className="comboParent">
                    <div>
                        <h2>Sample One</h2>
                        <div id="histogram1"></div>
                    </div>
                    <div>
                        <h2>Sample Two</h2>
                        <div id="histogram2"></div>
                    </div>
                    <div>
                        <h2>Sample Three</h2>
                        <div id="histogram3"></div>
                    </div>
                </div>

                <div className="comboParent">
                    <div>
                        <h2>Sample One</h2>
                        <div id="radarChart1"></div>
                    </div>
                    <div>
                        <h2>Sample Two</h2>
                        <div id="radarChart2"></div>
                    </div>
                    <div>
                        <h2>Sample Three</h2>
                        <div id="radarChart3"></div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default D3ComboComp;
