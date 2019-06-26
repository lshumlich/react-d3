import React, { Component } from "react";
// import * as d3 from 'd3'
import D3BarGraph from "./D3BarGraphV2";

/**
 * inspired by: https://bl.ocks.org/caravinden/d04238c4c9770020ff6867ee92c7dac1
 */

class D3BarGraphV2Comp extends Component {

    constructor() {
        super();
        this.d3barGraph = new D3BarGraph();
    }

    componentDidMount = () => {
        //
        // This should fetch data from an API and then graph away...
        //
        this.barGraph();
    }

    barGraph = () => {

        this.data = [
            {label:'HTML', value: 3.2},
            {label:'CSS', value: 5.5},
            {label:'JS', value: 12.5},
            {label:'React', value: 15},
            {label:'Python', value: 25.5},
            {label:'Java', value: 20},
        ];

        const options = {
            color: "steelblue",
            width: 700,
            height: 350,
            // min:0,
            // max: 30,
        }

        this.d3barGraph.drawBarGraph('.bargraph', this.data, options);
        this.add = true;
    }

    refresh = () => {
        // console.log(this.data);
        this.data.forEach((a,b,c) => {
            let v = Math.round(a.value * Math.random() * 2);
            a.value = v ? v : 5;
            // console.log(before,'--',a.value);
        });

        if (this.add) {
            this.data.unshift({label:'Stuff' + this.data.length, value: 5});
        } else {
            this.data.shift();
        }
        this.add = (!this.add);
        console.log(this.data);
        this.d3barGraph.refresh(this.data);
    }

    render() {
        return (
            <div>
                <h3>We are in D3BarGraphV2Comp</h3>
                <p onClick={this.refresh} className="pacifico">Refresh the data.</p>

                <div className="bargraph"></div>

            </div>
        );
    }
}

export default D3BarGraphV2Comp;
