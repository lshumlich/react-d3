import * as d3 from 'd3'

/**
 * Inspired by: https://bl.ocks.org/caravinden/d04238c4c9770020ff6867ee92c7dac1
 */

class D3BarGraph {

    drawBarGraph = (id, data, options) => {

        this.cfg = {
            ticks: 20, // approxamate number of ticks
            color: "steelblue", // any color
            format: ",.0f",  // for options: https://github.com/d3/d3-format 
            width: 960,
            height: 500,
            margin: { top: 20, right: 30, bottom: 30, left: 30 },
            min: null, // if you wish to override
            max: null, // if you wish to override
        }

        //Put all of the overriden options into a variable called cfg
        if ("undefined" !== typeof options) {
            for (var i in options) {
                if ("undefined" !== typeof options[i]) {
                    this.cfg[i] = options[i];
                }
            } //for i
        } //if

        const width = this.cfg.width - this.cfg.margin.left - this.cfg.margin.right,
            height = this.cfg.height - this.cfg.margin.top - this.cfg.margin.bottom;

        this.height = height;

        console.log("Height * width", height, width);

        this.x = d3.scaleBand()
            .rangeRound([0, width])
            .padding(0.1);

        this.y = d3.scaleLinear()
            .rangeRound([height, 0]);

        this.x.domain(data.map((v) => v.label));
        this.y.domain([0, d3.max(data, (v) => v.value)]);

        /////////////////////////////////////////////////////////
        //////////// Create the container SVG and g /////////////
        /////////////////////////////////////////////////////////

        // Remove whatever chart with the same id/class was present before

        d3.select(id)
            .select("svg")
            .remove();

        const svg =
            d3.select(id)
                .append("svg")
                .attr("width", width + this.cfg.margin.left + this.cfg.margin.right)
                .attr("height", height + this.cfg.margin.top + this.cfg.margin.bottom)
                .append("g")
                .attr("transform", "translate(" + this.cfg.margin.left + "," + this.cfg.margin.top + ")");

        this.svg = svg;

        // Draw the axis on the Bottom
        this.yAxis = this.svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(this.x));

        this.xAxis = svg.append("g");
        this.xAxis
            .call(d3.axisLeft(this.y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Scale");

        let x = this.x;
        let y = this.y;

        this.updateBar(this.svg, data, x, y, height);

    }


    //  Example of doing a refresh
    //  https://bl.ocks.org/tillg/14a9b1a363e82223c764551e977405f5
    refresh = (data) => {

        // console.log(data);

        const x = this.x;
        const y = this.y;
        const height = this.height;

        console.log("In front end v3");

        this.x.domain(data.map((v) => v.label));
        this.y.domain([0, d3.max(data, (v) => v.value)]);

        // Redraw the left axis
        // this.svg.append("g")
        // this.svg.selectAll(".y.axis")
        this.xAxis
            .transition()
            .duration(1000)
            .call(d3.axisLeft(this.y));

        this.yAxis
            .transition()
            .duration(1000)
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(this.x));

        this.updateBar(this.svg, data, x, y, height);

    }

    updateBar = (svg, data, x, y, height) => {

        const bar = svg.selectAll(".bar").data(data);

        // Remove any spare bars
        bar
            .exit()
            .transition()
            .style("opacity", 0)
            .remove();

        // Updates the bars that exist
        bar
            .transition()
            .duration(1000)
            .attr("x", function (d) {
                return x(d.label);
            })
            .attr("y", function (d) {
                return y(Number(d.value));
            })
            .attr("width", this.x.bandwidth())
            .attr("height", function (d) {
                return height - y(Number(d.value));
            });

        // Add new bars for those that do not exist
        bar
            .enter()
            .append("rect")
            .transition()
            .duration(1000)
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.label);
            })
            .attr("y", function (d) {
                return y(Number(d.value));
            })
            .attr("width", this.x.bandwidth())
            .attr("height", function (d) {
                return height - y(Number(d.value));
            });

    }

}

export default D3BarGraph;
