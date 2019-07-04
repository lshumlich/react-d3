import * as d3 from 'd3'

/**
 * Inspired by: https://bl.ocks.org/caravinden/d04238c4c9770020ff6867ee92c7dac1
 */

class D3BarGraph {

    drawBarGraph = (id, data, options) => {

        this.cfg = {
            color: "steelblue",     // any color
            format: ",.0f",         // for options: https://github.com/d3/d3-format 
            width: 960,             // default width
            height: 500,            // default height
            margin: { top: 20, right: 30, bottom: 30, left: 30 }, // default Margin
            min: null,              // minimum value for y index
            max: null,              // maxamum value for y index
        }

        // update the cfg object with overridden options
        if ("undefined" !== typeof options) {
            for (var i in options) {
                if ("undefined" !== typeof options[i]) {
                    this.cfg[i] = options[i];
                }
            }
        }

        this.width = this.cfg.width - this.cfg.margin.left - this.cfg.margin.right;
        this.height = this.cfg.height - this.cfg.margin.top - this.cfg.margin.bottom;

        // this.height = height;

        this.x = d3.scaleBand()
            .rangeRound([0, this.width])
            .padding(0.1);

        this.y = d3.scaleLinear()
            .rangeRound([this.height, 0]);

        this.x.domain(data.map((v) => v.label));
        this.y.domain([0, d3.max(data, (v) => v.value)]);

        /////////////////////////////////////////////////////////
        //////////// Create the container SVG and g /////////////
        /////////////////////////////////////////////////////////

        // Remove whatever chart with the same id/class was present before

        d3.select(id)
            .select("svg")
            .remove();

        this.svg =
            d3.select(id)
                .append("svg")
                .attr("width", this.width + this.cfg.margin.left + this.cfg.margin.right)
                .attr("height", this.height + this.cfg.margin.top + this.cfg.margin.bottom)
                .append("g")
                .attr("transform", "translate(" + this.cfg.margin.left + "," + this.cfg.margin.top + ")");

        // Draw the axis on the Bottom
        this.yAxis = this.svg.append("g")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.x));

        this.xAxis = this.svg.append("g");
        this.xAxis
            .call(d3.axisLeft(this.y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Scale");

        this.updateBar(this.svg, data, this.x, this.y, this.height);

    }

    //  Example of doing a refresh
    //  https://bl.ocks.org/tillg/14a9b1a363e82223c764551e977405f5
    refresh = (data) => {

        this.x.domain(data.map((v) => v.label));
        this.y.domain([0, d3.max(data, (v) => v.value)]);

        // Redraw the left axis
        this.xAxis
            .transition()
            .duration(1000)
            .call(d3.axisLeft(this.y));

        this.yAxis
            .transition()
            .duration(1000)
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.x));

        this.updateBar(this.svg, data, this.x, this.y, this.height);

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
