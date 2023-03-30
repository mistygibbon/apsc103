// import { addTemperatureData, temperatureChart} from "./temperature.js"
import { addRandomData, shiftChart, createChart, createChartControls} from "./chartManipulation"
import {Chart} from 'chart.js';

console.log("Script loaded")

const chartNames = ["temperature", "velocity"]
let chartContainers = document.querySelectorAll("div.chartContainer")
chartContainers.forEach(chartContainer => {
    let chartCanvas = document.createElement("canvas")
    let chartName = chartNames.shift()
    chartContainer.appendChild(chartCanvas)
    createChart(chartName,undefined,chartCanvas).then((response)=>{
        console.log(response)
        createChartControls(response)
    })
});

// let temperatureChart

// createChart("temperature").then((response)=>{
//     console.log(response)
//     temperatureChart = response
//     createChartControls(temperatureChart)
// })
// let velocityChart
// createChart("velocity").then((response)=>{
//     console.log(response)
//     velocityChart = response
//     createChartControls(velocityChart)
// })


// console.log(temperatureChart)
// let button = document.querySelector("button#addRandomData")
// button.addEventListener("click", ()=>{shiftChart(addRandomData(temperatureChart),100).update()})
// let chartUpdate = setInterval(()=>{
//     shiftChart(addRandomData(velocityChart),50).update()
//     shiftChart(addRandomData(temperatureChart),50).update()
// }, 1000)

// let buttonStopAuto = document.querySelector("button#stopAuto")
// buttonStopAuto.addEventListener("click", ()=>{clearInterval(chartUpdate)})

// let p = document.querySelector("div#timeline-container p#pod")
// p.style.marginLeft = "10px"
// let margin = -10
// function addMargin(){
//     margin += 1
//     if (margin >= p.parentElement.clientWidth){margin = -10}
//     p.style.marginLeft = `${margin}px`
// }
// setInterval(addMargin,10)