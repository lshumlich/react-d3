import * as d3 from 'd3'
/**
 * The code I wished I had when I started D3.
 * 
 * These code examples help step through many of the main concepts in D3. 
 * Each section builds on the last section and progresses to building very 
 * functional graphs. The D3JS.or site takes it to the next level. I hope 
 * this sparks the interest to start including data visualization in the 
 * applications you build.
 * 
 * Concept 1 - Selectors 
 * 
 * D3 assists in selecting DOM elements and allows us to manipulate them 
 * as a group. 
 * 
 * Concept 2 - Selectors with Data
 * 
 * D3 can join selectors with data to allow DOM manipulation.
 * 
 * Concept 3 - SVG Graphics
 * 
 * SVG is a sophisticated graphing engin that is included in the browser. 
 * These tools can allow you to harness that incredible potential.
 * 
 * Concept 4 - SVG Graphics with selectors can be very powerful.
 */

class D3Play {

    play = () => {

        // this.simpleSelect();
        // this.simpleDataSelect();
        // this.simpleSVG();
        this.simpleDataSVG();

    }

    simpleSelect = () => {

        // Simple example of a select and append
        d3.select('#myStuff')
            .append('h3')
            .text('Yet Another Thing');

        d3.select('#myStuff')
            .selectAll('h3')
            .style("color", "green");

    }

    simpleDataSelect = () => {

        /**
         * This sets up a join. It looks for all "h3" DOM object
         * in the 'mystuff' id 
         * and joins them with the array of data. 
         * One of three things will happen with the join:
         *  - more DOM objects then data (remove the extra DOM objects)
         *  - more items in the array then DOM objects 
         *    (then add or enter the extra DOM objects)
         *  - for the ones that match update the DOM objects
         */

        // const data = ['one', 'two', 'three', 'four', 'five'];
        const data = ['one'];

        let h3s = d3.select('#myStuff')
            .selectAll('h3')
            .data(data);

        h3s.text(d => d + ' change stuff.');

        h3s.enter()
            .append('h3')
            .text(d => d + ' enter stuff.');

        h3s.exit()
            .remove();

    }

    simpleSVG = () => {

        d3.select("#playgraph")
            .select('svg')
            .remove();

        const svg =
            d3.select("#playgraph")
            .append("svg")
            .attr("width", 500)
            .attr("height", 450)
            .style("background-color", "#EBE8F0");

        svg.append("rect")
            .transition()
            .duration(3000)
            .attr("width", 120)
            .attr("height", 150)
            .attr("x", 70)
            .attr("y", 70)
            .attr("class", "fade")
            // .attr("class", "rotate")
            // .attr("class", "shrink")
            .transition()
            .duration(3000)
            .attr("transform", "translate(20,20)");


        svg.append("circle")
            .on("click", () => console.log("handleClick"))
            .on("mouseover", () => console.log("handleMouseOver"))
            .on("mouseout", () => console.log("handleMouseOut"))

        .transition()
            .duration(3000)
            .attr("r", 120)
            .attr("cx", 330)
            .attr("cy", 170)
            .attr("class", "fade")
            // .attr("class", "rotate")
            // .attr("class", "shrink")
            .transition()
            .duration(3000)
            .attr("transform", "translate(20,20)");

    }

    simpleDataSVG = () => {

        d3.select("#playgraph")
            .select('svg')
            .remove();

        const svg =
            d3.select("#playgraph")
            .append("svg")
            .attr("width", 1200)
            .attr("height", 450)
            .style("background-color", "#EBE8F0");

        const data = [
            { label: 'Val 1', value: 5 },
            { label: 'Val 2', value: 10 },
            { label: 'Val 3', value: 15 },
            { label: 'Val 4', value: 20 },
            { label: 'Val 5', value: 25 },
            { label: 'Val 5', value: 30 },
            { label: 'Val 5', value: 35 },
        ];

        const obj = svg.selectAll(".obj").data(data);

        obj.enter()
            .append("rect")
            .transition()
            .duration(1000)
            .attr("class", "obj")
            .attr("x", d => d.value * 30)
            .attr("y", d => d.value * 5)
            .attr("width", d => d.value * 2)
            .attr("height", d => d.value);

        obj.enter()
            .append("text")
            .text(d => d.label)
            .attr("x", d => d.value * 30)
            .attr("y", d => d.value * 5 + 10)
            .attr('stroke', 'black');

        obj.enter()
            .append("circle")
            .on("mouseover", (d) => console.log("handleMouseOver", d))
            .transition()
            .duration(1000)
            .attr("class", "obj")
            .attr("cx", d => d.value * 30)
            .attr("cy", d => d.value * 5 + 150)
            .attr("r", d => d.value * 2);
    }

}

export default D3Play;