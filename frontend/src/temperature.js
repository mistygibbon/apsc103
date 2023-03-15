import {Chart} from 'chart.js';

let temperatureData = require('./temperature.json')
console.log(temperatureData);

const config = {
    type: 'line',
    data: {
        labels: temperatureData.map(data=>data.time),
        datasets: [{
            label: "temperature",
            data: temperatureData.map(data=>data.temperature),
            borderColor: "red",
            tension: 0.3
        }]
    },
    options: {
        plugins: {
            legend: {
              display: false
            }
        },
        responsive: true,
        maintainAspectRatio: false,

    },
    plugins: []
}

const chart = new Chart(
    document.getElementById("temperature"),
    config
)

function addTemperatureData(){
    let rng = Math.floor(Math.random() * 50)
    data = chart.data
    data.labels.push(data.labels.at(-1)+1)
    if (data.labels.length>=20){
        data.labels.shift()
    }
    data.datasets[0].data.push(rng)
    if (data.datasets[0].data.length>=20){
        data.datasets[0].data.shift()
    }
    console.log(data.labels, data.datasets[0].data)
    chart.update('none')
}

export {addTemperatureData}