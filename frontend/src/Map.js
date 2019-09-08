import React from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const IMAGE_WIDTH = 2207, IMAGE_HEIGHT = 1374;

// Map corners:
// Top left: 44.21962,22.35168
// Bottom right: 41.179,28.510
function gpsCoordToScreenCoord(gpsCoords, width, height) {
    return {
        x: gpsCoords.lon - 22.35168,
        y: gpsCoords.lat - 44.21962
    }
}

let svg;

class Map extends React.Component {
    getTrains(a) {
        axios.get('http://localhost:8081/stat?id=1').then(response => {
            let coo = gpsCoordToScreenCoord(response.data.position);
            a.t1.attr('cx', coo.x).attr('cy', coo.y);
        });
        axios.get('http://localhost:8081/stat?id=2').then(response => {
            let coo = gpsCoordToScreenCoord(response.data.position);
            a.t2.attr('cx', coo.x).attr('cy', coo.y);
        });
    }

    // animtrain(a) {
    //     a.t1.transition().attr('cx', a.t1pos.lon).attr('cy', a.t1pos.lat).duration(1000)
    //     a.t2.transition().attr('cx', a.t2pos.lon).attr('cy', a.t2pos.lat).duration(1000)
    // }

    componentDidMount() {
        this.width = Math.floor(window.innerWidth);
        this.height = Math.floor(window.innerHeight * 93 / 100);
        svg = d3.select('#map').append('svg').attr('width', this.width).attr('height', this.height).call(d3.zoom().scaleExtent([0.1, 10]).on('zoom', function () {
            svg.attr('transform', d3.event.transform)
        })).append('g');

        let img = svg.append('image').attr('xlink:href', 'bulgaria2.svg').attr('x', 0).attr('y', 0);
        if (this.width > this.height) {
            this.width = this.height * 1.6;
            while(this.width > window.innerWidth) {
                this.width --;
            }
            this.height = this.width / 1.6;
        } else {
            this.height = this.width / 1.6;
            while(this.height > window.innerHeight) {
                this.height --;
            }
            this.width = this.height * 1.6;
        }
        img.attr('width', this.width);
        img.attr('height', this.height);
        let mocky = 500;
        let mockx = 530;

        let data1 = [{ k: mockx, v: mocky }, { k: mockx, v: 800 }];
        let data2 = [{ k: mockx, v: mocky }, { k: 1450, v: mocky }];
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
        this.t1 = svg.append('circle').attr('cx', mockx).attr('cy', mocky).attr('r', 6).attr('fill', 'red').attr('stroke', '#666').attr('stroke-width', 1.5);
        this.t2 = svg.append('circle').attr('cx', mockx).attr('cy', mocky).attr('r', 6).attr('fill', 'blue').attr('stroke', '#666').attr('stroke-width', 1.5);
        this.interval = [setInterval(this.getTrains, 200, this), /*setInterval(this.animtrain, 1000, this)*/];
    }

    componentWillUnmount() {
        for (let i of this.interval) {
            clearInterval(i);
        }
    }

    render() {
        return <div id="map"></div>
    }
}

export default Map;