let xml = new XMLHttpRequest();
let id = Number(prompt("TrainID"));
let lat = 200;
let lon = 200;

function iter() {
    xml.open('GET', 'http://localhost:8080/pos?id='+id+'&lat='+lat+'&lon='+lon);
    xml.send();
    if (id % 2 === 0) {
        lon += 10
    } else {
        lat += 10
    }
}

setInterval(iter, 1000)