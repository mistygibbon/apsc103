// import { addTemperatureData, temperatureChart} from "./temperature.js"
import { addRandomData, shiftChart, createChart, createChartControls} from "./chartManipulation"
import {  } from "./dataStorage";
import {Chart} from 'chart.js';
import { feedTestMetric } from "./backendAPI";
import { showPage } from "./render";
import { config } from "./config";
import { clearLocalStorageButton, exportDataButton } from "./components/settingsComponents";

console.log("Script loaded")

var chartArr



// Mode switcher
if (window.location.href.match(/\.html$/)){ // Multi page mode if url contains .html
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
}else{ // Single page mode
    console.log(config.pages["settings"])
    addEventListener("hashchange", async (event) => {
        let pageName = location.hash.substring(1)
        showPage(pageName).then(()=>{postRender()})
    });
    if (location.hash == ""){location.hash = "dashboard"}
    else {
        let pageName = location.hash.substring(1)
        showPage(pageName).then(()=>{postRender()})
    }
}

function postRender(){
    let pageName = location.hash.substring(1)
    if (pageName=="dashboard"||pageName=="graphs"){
        generateChart()
    } else if (pageName=="settings"){
        let div = document.querySelector("div.optionsContainer")
        div.appendChild(exportDataButton())
        div.appendChild(clearLocalStorageButton())
    }
}


function generateChart(){
    let metricName = Object.getOwnPropertyNames(config.metrics)
    const chartNames = config.graphMetrics
    let chartContainers = document.querySelectorAll("div.chartContainer")
    chartArr = []
    chartContainers.forEach(chartContainer => {
        let chartCanvas = document.createElement("canvas")
        let chartName = chartNames.shift()
        console.log(chartName)
        if (chartName == undefined){
            return
        }
        chartContainer.appendChild(chartCanvas)

        createChart(chartName,undefined,chartCanvas).then((response)=>{
            console.log(response)
            createChartControls(response)
        })
    }); 
}



// function showPage(hash){
//     if (hash == "#settings"){
//         showSettings()
//     }
//     if (hash == "#dashboard"){
//         showDashboard()
//     }
//     if (hash == "#graphs"){
//         showGraphs()
//     }
// }

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
export {generateChart}