import {temperatureChart} from "./temperature"
import {Chart} from 'chart.js';


function addRandomData(chart){
    let rng = Math.floor(Math.random() * 50)
    let data = chart.data
    data.labels.push(data.labels.at(-1)+1)
    data.datasets[0].data.push(rng)
    console.log(data.labels, data.datasets[0].data)
    return chart
}

function shiftChart(chart, length=20){
    let data = chart.data
    while (data.labels.length>=length){
        data.labels.shift()
    }
    while (data.datasets[0].data.length>=length){
        data.datasets[0].data.shift()
    }
    return chart
}

export{addRandomData, shiftChart}