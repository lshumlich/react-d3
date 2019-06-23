import React, { Component } from "react";
import * as d3 from "d3";
import config from "./../config";
import "./D3BarGraph.css";

/*
 
	Big Note. This was just being played with

	It's just a wip.

*/

class D3BarGraph extends Component {

	constructor() {
		super();
		this.max = 0;
		this.state = {
			dateArray: [],
		};
	}
	componentDidMount() {
		// console.log("componentDidMount", this)
		this.dates = {};
		// this.names = {};

		fetch("http://localhost:8000/all", {
			method: "post",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json"
			},
			credentials: "include",
			body: JSON.stringify({
				user_token: this.props.user_token
			})
		})
			.then(response => response.json())
			.then(data => {
				data.forEach((r, i, x) => {
					if (!this.dates[r.date]) this.dates[r.date] = {};
					if (r.exercise) {
						this.dates[r.date][r.exercise]
							? this.dates[r.date][r.exercise]++
							: (this.dates[r.date][r.exercise] = 1);
						if (this.dates[r.date][r.exercise] > this.max)
							this.max = this.dates[r.date][r.exercise];
					}
				});

				// console.log(this.dates);
				// this.data = config.comps.map(i => ({
				// 	comp: i.comp,
				// 	no: Math.floor(Math.random() * 41)
				// }));
				// console.log(d);
				const dateArray = Object.keys(this.dates).sort();
				this.setState({
					dateArray: dateArray,
				})
				console.log(dateArray, dateArray[-1]);
				const gdata = this.getCountsForDate(dateArray[dateArray.length -1]);
				// console.log(this.data);
				this.drawBarGraph(gdata);
				// this.onRefresh();
				// const r = data[0]
				// console.log('-Just the first-', r)
				// console.log(data);
				// data.forEach((r, i, x) => {
				// 	if (!(r.student_id in this.students)) {
				// 		this.students[r.student_id] = {};
				// 		this.names[r.student_id] = r.student;
				// 		this.names_by_id.push(r.student_id);
				// 	}
				// 	this.students[r.student_id][r.date] = r;
				// 	if (!(r.date in this.dates)) {
				// 		this.dates[r.date] = "";
				// 	}
				// });
				// this.weeks = Object.keys(this.dates).sort();
				// this.names_by_id.sort((a, b) => {
				// 	return this.names[a] > this.names[b] ? 1 : -1;
				// });

				// // console.log("Weeks:", this.weeks);
				// // console.log("Students_by_id", this.names_by_id);
				// this.setState({ students: this.students });
			})
			.catch(err => console.log(err));

		// console.log("In componentDidMount.....");
		// console.log("Config:", config);
		// const data = [ 2, 4, 2, 6, 8 ]
		// this.drawBarChart(data)
	}

	drawBarGraph(data) {
		// const idBar = getElementById('idBar');
		// const rect = this.refs.idBar.getBoundingClientRect()

		// console.log("W & H:", rect.width, rect.height);

		// let data = this.data;

		var svg = d3.select("svg"),
			margin = { top: 20, right: 20, bottom: 30, left: 40 },
			width = +svg.attr("width") - margin.left - margin.right,
			height = +svg.attr("height") - margin.top - margin.bottom;

		// console.log("h & w:", height, width);

		var x = d3
				.scaleBand()
				.rangeRound([0, width])
				.padding(0.1),
			y = d3.scaleLinear().rangeRound([height, 0]);

		var g = svg
			.append("g")
			.attr(
				"transform",
				"translate(" + margin.left + "," + margin.top + ")"
			);

		x.domain(
			data.map(function(d) {
				return d.comp;
			})
		);
		y.domain([
			0,
			// d3.max(data, function(d) {
			// 	return d.no;
			// })
			this.max
		]);

		// console.log('x:', x);
		// console.log('y:', y);

		g.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));

		g.append("g")
			.attr("class", "axis axis--y")
			.call(d3.axisLeft(y).ticks(5, "f"));

		g.selectAll(".bar")
			.data(data)
			.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", function(d) {
				return x(d.comp);
			})
			.attr("y", function(d) {
				return y(d.no);
			})
			.attr("width", x.bandwidth())
			.attr("height", function(d) {
				// console.log("transition-->:", height, d.no, y(d.no));
				return height - y(d.no);
			});
	}

	onPickDate = (event) => {
		// console.log(
		// 	"PickDate:",
		// 	event.target.textContent,
		// 	event.target.className
		// );
		// console.log("This:", this);
		if(event.target.className === 'clDate') {
			const gdata = this.getCountsForDate(event.target.textContent);
			this.onRefresh(gdata);
		}
	}

	getCountsForDate(date) {
		console.log(date);
		// console.log(this.dates[date]);
		const data = config.comps.map(i => ({
			comp: i.comp,
			no: this.dates[date][i.comp] ? this.dates[date][i.comp] : 0
		}));
		return data;
	}

	render() {

		const dates = this.state.dateArray.map(d => 
			<div key={d} className="clDate">{d}</div>
		)

		return (
			<div>
				<div>
					<button onClick={this.onShow}>Show</button>
					<button onClick={this.onRefresh}>Refresh</button>
				</div>
				<div id="idBar" ref="canvas">
					<div id="idDates" width="10%" onClick={this.onPickDate}>
						{dates}
					</div>
					<svg ref="idBar" width="800" height="500" />
				</div>
			</div>
		);
	}

	onRefresh = data => {
		// let data = this.data;
		// data[0].no++;

		var svg = d3.select("svg"),
			margin = { top: 20, right: 20, bottom: 30, left: 40 },
			width = +svg.attr("width") - margin.left - margin.right,
			height = +svg.attr("height") - margin.top - margin.bottom;

		// console.log("h & w:", height, width);

		var x = d3
				.scaleBand()
				.rangeRound([0, width])
				.padding(0.1),
			y = d3.scaleLinear().rangeRound([height, 0]);

		// Remove object with data
		x.domain(
			data.map(function(d) {
				return d.comp;
			})
		);
		y.domain([
			0,
			// d3.max(data, function(d) {
			// 	return d.no;
			// })
			this.max
		]);

		var bar = svg.selectAll(".bar").data(data);
		// console.log(bar);
		bar.exit().remove();

		// bar.transition()
		//   .duration(3000)
		//   .attr("transform", function(d) { return "translate(" + 20 + "," + 20 + ")"; });

		bar.transition()
			.duration(1000)
			// .attr("height", function(d) { return height - y(d.no); });
			.attr("y", function(d) {
				return y(d.no);
			})
			.attr("height", function(d) {
				// console.log("transition:", height, d.no, y(d.no));
				return height - y(d.no);
				// return 110;
			});
	};
}
export default D3BarGraph;
