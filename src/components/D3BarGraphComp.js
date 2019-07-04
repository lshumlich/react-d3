import React, { Component } from "react";
import D3BarGraph from "./D3BarGraph";

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
        // This method should fetch data from an API and then graph away...
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

        this.data.forEach((a,b,c) => {
            let v = Math.round(a.value * Math.random() * 2);
            a.value = v ? v : 5;
        });

        if (this.add) {
            this.data.unshift({label:'Stuff' + this.data.length, value: 5});
        } else {
            this.data.shift();
        }
        this.add = (!this.add);

        this.d3barGraph.refresh(this.data);
    }

    render() {
        return (
            <div>
                <h3>D3BarGraphComp</h3>
                <p onClick={this.refresh} className="pacifico">Refresh the data.</p>

                <div className="bargraph"></div>

            </div>
        );
    }
}

export default D3BarGraphV2Comp;
