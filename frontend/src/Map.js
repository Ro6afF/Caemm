import React from 'react';
import ReactSVG from 'react-svg';
import * as d3 from 'd3';

class Map extends React.Component {
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        const svg = d3.select("#map").append("svg").attr("width", 800).attr("height", 600);
        svg.append("image").attr("xlink:href", "bulgaria.svg").attr("width", 800).attr("height", 600)
        let data1 = [{ k: 200, v: 200 }, { k: 200, v: 500 }];
        let data2 = [{ k: 200, v: 200 }, { k: 500, v: 200 }];
        svg.append("path")
            .datum(data1)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .x(function (d) { return d.k })
                .y(function (d) { return d.v })
            );
        svg.append("path")
            .datum(data2)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .x(function (d) { return d.k })
                .y(function (d) { return d.v })
            );
    }

    render() {
        return <div id="map"></div>
    }
}

export default Map;