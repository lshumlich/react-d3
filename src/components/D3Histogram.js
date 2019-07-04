import * as d3 from 'd3'

/**
 * Inspired by: http://bl.ocks.org/nnattawat/8916402
 */

class D3Histogram {

    drawHistogram = (id, values, options) => {

        this.cfg = {
            ticks: 20,              // approxamate number of ticks
            color: "steelblue",     // any color
            format: ",.0f",         // for options: https://github.com/d3/d3-format 
            width: 960,             // default width
            height: 500,            // default height
            margin: { top: 20, right: 30, bottom: 30, left: 30 }, // default Margin
            min: null,              // minimum value for y index
            max: null,              // maximum value for y index
        }

        // update the cfg object with overridden options
        if ("undefined" !== typeof options) {
            for (var i in options) {
                if ("undefined" !== typeof options[i]) {
                    this.cfg[i] = options[i];
                }
            }
        }

        const formatCount = d3.format(this.cfg.format);
        this.formatCount = formatCount;

        const width = this.cfg.width - this.cfg.margin.left - this.cfg.margin.right,
            height = this.cfg.height - this.cfg.margin.top - this.cfg.margin.bottom;

        this.height = height;

        const max = this.cfg.max ? this.cfg.max : d3.max(values);
        const min = this.cfg.min ? this.cfg.min : d3.min(values);

        const x = d3.scaleLinear()
            .domain([min, max])
            .range([0, width]);
        this.x = x;

        // Generate a histogram using twenty uniformly-spaced bins (about).
        const data = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(this.cfg.ticks))(values);

        // Reset y domain using new data
        const yMax = d3.max(data, function (d) { return d.length });
        const yMin = d3.min(data, function (d) { return d.length });
        const colorScale = d3.scaleLinear()
            .domain([yMin, yMax])
            .range([d3.rgb(this.cfg.color).brighter(), d3.rgb(this.cfg.color).darker()]);

        const y = d3.scaleLinear()
            .domain([0, yMax])
            .range([height, 0]);
        this.y = y;

        const xAxis = d3.axisBottom()
            .scale(x);

        /////////////////////////////////////////////////////////
        //////////// Create the container SVG and g /////////////
        /////////////////////////////////////////////////////////

        // Remove whatever chart with the same id/class was present before

        d3.select(id)
            .select("svg")
            .remove();

        this.svg = d3
            .select(id)
            .append("svg")
            .attr("width", width + this.cfg.margin.left + this.cfg.margin.right)
            .attr("height", height + this.cfg.margin.top + this.cfg.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.cfg.margin.left + "," + this.cfg.margin.top + ")");

        const bar = this.svg.selectAll(".bar")
            .data(data)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

        bar.append("rect")
            .attr("x", 1)
            .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
            .attr("height", function (d) { return height - y(d.length); })
            .attr("fill", function (d) { return colorScale(d.length) });

        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", -12)
            .attr("x", d => Math.max(0, x(d.x1) - x(d.x0) - 1) / 2)
            .attr("text-anchor", "middle")
            .text(function (d) { return formatCount(d.length); });

        this.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
    }

    /*
    * Adding refresh method to reload new data
    */
    refresh = (values) => {

        let y = this.y;
        let x = this.x;
        let height = this.height;
        let formatCount = this.formatCount;

        var data = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(this.cfg.ticks))(values);

        // Reset y domain using new data
        var yMax = d3.max(data, function (d) { return d.length });
        var yMin = d3.min(data, function (d) { return d.length });
        this.y.domain([0, yMax]);

        var colorScale = d3.scaleLinear()
            .domain([yMin, yMax])
            .range([d3.rgb(this.cfg.color).brighter(), d3.rgb(this.cfg.color).darker()]);

        var bar = this.svg.selectAll(".bar").data(data);

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

    // From the previous example
    // onRefresh = () => {
    //     var values = d3.range(1000).map(d3.randomNormal(20, 5));
    //     this.refresh(values);
    // }

}
export default D3Histogram;
