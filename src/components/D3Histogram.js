import React, { Component } from 'react'
import * as d3 from 'd3'

/**
 * Inspired by: http://bl.ocks.org/nnattawat/8916402
 */

/*

	Big Note. This was just being played with

	It's just a wip.

*/


class D3Histogram extends Component {

    componentDidMount = () => {
        this.drawHistogram();
    }

    drawHistogram = () => {
        var color = "steelblue";
        this.color = color;

        // Generate a 1000 data points using normal distribution with mean=20, deviation=5
        var values = d3.range(1000).map(d3.randomNormal(20, 5));

        // A formatter for counts.
        var formatCount = d3.format(",.0f");
        this.formatCount = formatCount;

        var margin = { top: 20, right: 30, bottom: 30, left: 30 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        this.height = height;

        var max = d3.max(values);
        var min = d3.min(values);
        var x = d3.scaleLinear()
            .domain([min, max])
            .range([0, width]);
        this.x = x;
        // console.log('x---',x);
        // Generate a histogram using twenty uniformly-spaced bins.
        // var data = d3.histogram()
        //     .bins(x.ticks(20))
        //     (values);

        var data = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(20))(values);

        // console.log('data:',data);


        // Reset y domain using new data
        var yMax = d3.max(data, function (d) { return d.length });
        var yMin = d3.min(data, function (d) { return d.length });
        var colorScale = d3.scaleLinear()
            .domain([yMin, yMax])
            .range([d3.rgb(color).brighter(), d3.rgb(color).darker()]);

        var y = d3.scaleLinear()
            .domain([0, yMax])
            .range([height, 0]);
        this.y = y;

        var xAxis = d3.axisBottom()
            .scale(x);

        // var xAxis = d3.axisBottom()
        //     .tickValues(['a','b','c']);



        // console.log(xAxis);

        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        this.svg = svg;
        // console.log(x);

        var bar = svg.selectAll(".bar")
            .data(data)
            .enter().append("g")
            .attr("class", "bar")
            // .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });
            .attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

        bar.append("rect")
            .attr("x", 1)
            .attr("width", (x(2) - x(0)) - 1)
            .attr("height", function (d) { return height - y(d.length); })
            .attr("fill", function (d) { return colorScale(d.length) });

        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", -12)
            .attr("x", (x(2) - x(0)) / 2)
            .attr("text-anchor", "middle")
            .text(function (d) { return formatCount(d.length); });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height + 20) + ")")
            .call(xAxis);
    }


    /*
    * Adding refresh method to reload new data
    */
    refresh = (values) => {
        console.log('Hello from refreshx');
        // var values = d3.range(1000).map(d3.random.normal(20, 5));
        // var data = d3.layout.histogram()
        //   .bins(x.ticks(20))
        //   (values);

        let y = this.y;
        let x = this.x;
        let color = this.color;
        let svg = this.svg;
        let height = this.height;
        let formatCount = this.formatCount;

        var data = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(20))(values);

        // Reset y domain using new data
        var yMax = d3.max(data, function (d) { return d.length });
        var yMin = d3.min(data, function (d) { return d.length });
        y.domain([0, yMax]);
        // var colorScale = d3.scale.linear()
        //             .domain([yMin, yMax])
        //             .range([d3.rgb(color).brighter(), d3.rgb(color).darker()]);

        var colorScale = d3.scaleLinear()
            .domain([yMin, yMax])
            .range([d3.rgb(color).brighter(), d3.rgb(color).darker()]);

        var bar = svg.selectAll(".bar").data(data);

        // Remove object with data
        bar.exit().remove();

        bar.transition()
            .duration(1000)
            .attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

        bar.select("rect")
            .transition()
            .duration(1000)
            .attr("height", function (d) { return height - y(d.length); })
            .attr("fill", function (d) { return colorScale(d.length) });

        bar.select("text")
            .transition()
            .duration(1000)
            .text(function (d) { return formatCount(d.length); });

    }

    onRefresh = () => {
        var values = d3.range(1000).map(d3.randomNormal(20, 5));
        this.refresh(values);
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.onRefresh}>Refresh</button>
                </div>
                <div ref="canvas">In the D3Play Div</div>
                <div>
                    <button onClick={this.onRefresh}>Refresh</button>
                </div>
            </div>
        )
    }
}
export default D3Histogram;