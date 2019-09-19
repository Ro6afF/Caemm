let xml = new XMLHttpRequest();
let id = Number(prompt("TrainID"));
let lat = 42.697243279857624;
let lon = 23.33816747913704;

function iter() {
    xml.open('GET', 'http://localhost:8080/pos?id=' + id + '&lat=' + lat + '&lon=' + lon);
    xml.send();
    if (id % 2 === 0) {
        if (lon < 27.465348)
            lon += 0.001
    }
    else if (lat < 41.70121246373506)
        lat += 0.001
}

setInterval(iter, 200)