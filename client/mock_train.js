let xml = new XMLHttpRequest();
let id = Number(prompt("TrainID"));
let lat = 0;
let lon = 0;

function iter() {
    xml.open('GET', 'http://localhost:8080/pos?id='+id+'&lat='+lat+'&lon='+lon);
    xml.send();
    if (id % 2 === 0) {
        lat += 0.001
    } else {
        lon += 0.001
    }
}

setInterval(iter, 10000)