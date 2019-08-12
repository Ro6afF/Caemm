import React from 'react';
import axios from 'axios';
import * as d3 from 'd3';

class Map extends React.Component {
    constructor(props) {
        super(props)
    }

    getTrains(a) {
        axios.get('http://localhost:8081/stat?id=1').then(response =>
            a.t1.attr("cx", response.data.position.lon).attr("cy", response.data.position.lat));
            axios.get('http://localhost:8081/stat?id=2').then(response =>
            a.t2.attr("cx", response.data.position.lon).attr("cy", response.data.position.lat));
    }

    componentDidMount() {
        this.svg = d3.select("#map").append("svg").attr("width", 800).attr("height", 600);
        this.svg.append("image").attr("xlink:href", "bulgaria.svg").attr("width", 800).attr("height", 600)
        let data1 = [{ k: 200, v: 200 }, { k: 200, v: 500 }];
        let data2 = [{ k: 200, v: 200 }, { k: 500, v: 200 }];
        this.svg.append("path")
            .datum(data1)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .x(function (d) { return d.k })
                .y(function (d) { return d.v })
            );
        this.svg.append("path")
            .datum(data2)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .x(function (d) { return d.k })
                .y(function (d) { return d.v })
            );
        this.t1 = this.svg.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 10).attr("fill", "red")
        this.t2 = this.svg.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 10).attr("fill", "blue")
        this.interval = setInterval(this.getTrains, 3000, this)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return <div id="map"></div>
    }
}

export default Map;