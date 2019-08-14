let xml = new XMLHttpRequest();
let id = Number(prompt("TrainID"));
let lat = 500;
let lon = 530;

function iter() {
    xml.open('GET', 'http://localhost:8080/pos?id=' + id + '&lat=' + lat + '&lon=' + lon);
    xml.send();
    if (id % 2 === 0) {
        if (lon < 1450)
            lon += 2
    }
    else if (lat < 800)
        lat += 2
}

setInterval(iter, 200)