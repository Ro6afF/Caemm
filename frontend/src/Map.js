import React from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const TOP_LEFT = {
    lat: 44.21962,
    lon: 22.35168
};
const BOTTOM_RIGHT = {
    lat: 41.179,
    lon: 28.510
};

function gpsCoordToScreenCoord(gpsCoords, width, height) {
    let diff_lat = Math.abs(TOP_LEFT.lat - BOTTOM_RIGHT.lat);
    let diff_lon = Math.abs(TOP_LEFT.lon - BOTTOM_RIGHT.lon);
    return {
        x: (gpsCoords.lon - TOP_LEFT.lon) * width / diff_lon,
        y: height - (gpsCoords.lat - BOTTOM_RIGHT.lat) * height / diff_lat
    }
}

class Map extends React.Component {
    getTrains(a) {
        axios.get('http://localhost:8081/all').then(response => {
            d3.selectAll('circle').remove();
            a.t = [];
            for (let i of response.data) {
                let coo = gpsCoordToScreenCoord(i.position, a.width, a.height);
                a.t.push(a.svg.append('circle').attr('cx', coo.x).attr('cy', coo.y).attr('r', 6).attr('fill', 'red').attr('stroke', '#666').attr('stroke-width', 1.5));
            }
        });
    }

    componentDidMount() {
        this.width = Math.floor(window.innerWidth);
        this.height = Math.floor(window.innerHeight * 93 / 100);
        let svg = d3.select('#map').append('svg').attr('width', this.width).attr('height', this.height).call(d3.zoom().scaleExtent([0.1, 10]).on('zoom', function () {
            svg.attr('transform', d3.event.transform)
        })).append('g');
        let img = svg.append('image').attr('xlink:href', 'bulgaria2.svg').attr('x', 0).attr('y', 0);
        if (this.width > this.height) {
            this.width = this.height * 1.6;
            while (this.width > window.innerWidth) {
                this.width--;
            }
            this.height = this.width / 1.6;
        } else {
            this.height = this.width / 1.6;
            while (this.height > window.innerHeight) {
                this.height--;
            }
            this.width = this.height * 1.6;
        }
        img.attr('width', this.width);
        img.attr('height', this.height);
        let mock = gpsCoordToScreenCoord({
            lat: 42.697243279857624,
            lon: 23.33816747913704
        }, this.width, this.height);
        let mockd1 = gpsCoordToScreenCoord({
            lat: 42.697243279857624,
            lon: 27.465348
        }, this.width, this.height);
        let mockd2 = gpsCoordToScreenCoord({
            lat: 41.70121246373506,
            lon: 23.33816747913704
        }, this.width, this.height);
        let data1 = [{ k: mock.x, v: mock.y }, { k: mock.x, v: mockd2.y }];
        let data2 = [{ k: mock.x, v: mock.y }, { k: mockd1.x, v: mock.y }];
        svg.append('path')
        .datum(data1)
        .attr('fill', 'none')
        .attr('stroke', '#ff0066')
        .attr('stroke-width', 3.5)
        .attr('d', d3.line()
        .x(function (d) { return d.k })
        .y(function (d) { return d.v })
        );
        svg.append('path')
        .datum(data2)
        .attr('fill', 'none')
        .attr('stroke', '#3060ff')
        .attr('stroke-width', 3.5)
        .attr('d', d3.line()
        .x(function (d) { return d.k })
        .y(function (d) { return d.v })
        );
        this.t = [];
        this.svg = svg;
        this.interval = [setInterval(this.getTrains, 200, this)];
    }
    
    componentWillUnmount() {
        for (let i of this.interval) {
            clearInterval(i);
        }
    }

    render() {
        document.title = "Caemm";
        return <div id="map"></div>
    }
}

export default Map;