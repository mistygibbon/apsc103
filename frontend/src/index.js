// import { addTemperatureData, temperatureChart} from "./temperature.js"
import { addRandomData, shiftChart, createChart, createChartControls} from "./chartManipulation"
import {  } from "./dataStorage";
import {Chart} from 'chart.js';
import { startFeedTestMetric, stopFeedTestMetric, warningData } from "./backendAPI";
import { showPage } from "./render";
import { config } from "./config";
import { clearLocalStorageButton, exportDataButton, generateSettingsItems, configEditTextBox } from "./components/settingsComponents";
import { cache } from "./backendAPI";
import { progressBarStart, progressBarStop} from "./progressBar";

var chartArr = []
var metricsAutoUpdate, mainTileAutoUpdate

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
        console.log(event)
        progressBarStop()
        clearInterval(metricsAutoUpdate)
        clearInterval(mainTileAutoUpdate)
        destroyChart()
        showPage(pageName).then(()=>{postRender()})
    });
    if (location.hash == ""){location.hash = "dashboard"}
    else {
        let pageName = location.hash.substring(1)
        showPage(pageName).then(()=>{postRender()})
    }
}
let deactivated = false
function postRender(){
    let pageName = location.hash.substring(1)
    if (pageName=="dashboard"){
        generateChart()
        progressBarStart()
        updateMainTile()
        mainTileAutoUpdate = setInterval(()=>{updateMainTile();console.log("main tile updated")},1000)
        let startTripButton = document.getElementById("startTripButton")
        if (deactivated == true){
            startTripButton.classList.add("deactivated")
        }
        startTripButton.addEventListener("click",()=>{
            if (deactivated==false){
            console.log("hi")
            startFeedTestMetric()
            startTripButton.classList.add("deactivated")
            deactivated = true
            }
        })

        let stopTripButton = document.getElementById("stopTripButton")
        stopTripButton.addEventListener("click", ()=>{
            stopFeedTestMetric()
            startTripButton.classList.remove("deactivated")
            deactivated = !deactivated
        })
    }
    if (pageName=="graphs"){
        generateChart()
    }
    if (pageName=="settings"){
        let div = document.querySelector("div.optionsContainer")
        generateSettings()
        div.insertBefore(exportDataButton(),div.querySelector("hr"))
        div.insertBefore(clearLocalStorageButton(),div.querySelector("hr"))
    }
    
    if (pageName=="metrics"){
        generateMetrics()
        metricsAutoUpdate = setInterval(()=>{generateMetrics();console.log("metrics updated")},1000)
    }
}

function generateSettings(div=document.querySelector("div.optionsContainer")){
    let settingsItems = config.settingsItems
    console.log(settingsItems)
    // let tmp = settingsItems.map((item)=>{config.settings[item].category})
    // let categoryList = tmp.filter(function(item, pos){
    //     return tmp.indexOf(item)== pos; 
    // });
    // console.log(tmp,categoryList)
    // div.insertBefore(configEditTextBox(),div.firstChild)
    settingsItems.reverse().forEach((setting)=>{
        div.insertBefore(generateSettingsItems(config.settings[setting]),div.firstChild)
    })
}

function generateChart(){
    let metricName = Object.getOwnPropertyNames(config.metrics)
    const chartNames = config.graphMetrics
    let chartContainers = document.querySelectorAll("div.chartContainer")
    chartContainers.forEach(chartContainer => {
        let chartCanvas = document.createElement("canvas")
        chartCanvas.id = "chartCanvas"
        let chartName = chartNames.shift()
        if (chartName == undefined){
            return
        }
        chartContainer.appendChild(chartCanvas)

        createChart(chartName,undefined,chartCanvas).then((response)=>{
            createChartControls(response)
            chartArr += response
        })
    }); 
    // document.querySelectorAll()
}

function destroyChart(){
    document.querySelectorAll("canvas#chartCanvas").forEach((canvas)=>{
        let chart = Chart.getChart(canvas)
        chart.clear()
        clearInterval(chart.autoUpdate)
        clearInterval(chart.autoAddData)
        console.log(canvas,chart)
        chart.destroy()
    })
}

function generateMetrics(){
    let metricsContainer = document.querySelector(".metricsContainer")
    metricsContainer.innerHTML = ""
    config.metricNames.forEach((metricName)=>{
        let p = document.createElement("p")
        p.classList = "metrics"
        p.innerText = `${metricName.titleCase()}: `
        console.log(cache)
        if (cache[metricName] != undefined){
            if (Array.isArray(cache[metricName]) && cache[metricName].length!==0){
                p.innerText += `${cache[metricName].at(-1).value}`
            } else if (typeof cache[metricName] === 'string'){
                p.innerText += `${cache[metricName]}`
                console.log(cache[metricName])
            }
        } else {
            p.innerText += `Undefined`
        }
        metricsContainer.appendChild(p)
    })
    let warningDataContainer = document.querySelector(".warningDataContainer")
    if (warningDataContainer){
        warningDataContainer.innerHTML = "<h2>Data that exceeded limit</h2>"
        config.metricNames.forEach((metricName)=>{
            let div = document.createElement("div")
            div.class = "metrics"
            let upperLimit = config.metrics[metricName].upperSafetyLimit
            let lowerLimit = config.metrics[metricName].lowerSafetyLimit

            div.innerHTML = `<hr><h3>${metricName.titleCase()}</h3> <p class="smallText">${lowerLimit? `Lower limit: ${lowerLimit}`:""} ${upperLimit ? `Upper limit: ${upperLimit}` : ""}</p>`
            warningData[metricName].forEach((dataPoint)=>{
                let p = document.createElement("p")
                p.classList = "smallText"
                p.innerText = `Time: ${+dataPoint.time.toFixed(2)}, Value: ${+dataPoint.value.toFixed(3)}`
                div.appendChild(p)
            })
            if (upperLimit || lowerLimit){
                warningDataContainer.appendChild(div)
            }
        })
    }
}


let notificationPermission = (async()=>{await Notification.requestPermission()})()

function updateMainTile(){
    let detailsDiv = document.getElementById("details")
    detailsDiv.innerHTML = "<h2>Details</h2>"
    let array = ["model"]
    array.forEach((data)=>{
        let p = document.createElement("p")
        p.innerText = `${data.titleCase()}: ${cache[data]}`
        detailsDiv.appendChild(p)
    })
    let metricsDiv = document.getElementById("keyMetrics")
    metricsDiv.innerHTML = "<h2>Key Metrics</h2>"
    let metricsArray = ["temperature","velocity","pressure"]
    metricsArray.forEach((metricName)=>{
        let p = document.createElement("p")
        if (Array.isArray(cache[metricName]) && cache[metricName].length!==0){
            p.innerText += `${metricName.titleCase()}: ${cache[metricName].at(-1).value.toFixed(2)}`
        } else if (typeof cache[metricName] === 'string'){
            p.innerText += `${metricName.titleCase()}: ${cache[metricName]}`
            console.log(cache[metricName])
        }
        metricsDiv.appendChild(p)
    })
    let warningText = document.createElement("p")
    warningText.classList = "warning"
    let warningMetrics = Object.getOwnPropertyNames(warningData)
    let warningDataSize = 0
    warningMetrics.forEach((warningMetric)=>{warningDataSize+=warningData[warningMetric].length})
    if (warningDataSize==1){
        warningText.innerText = `${warningDataSize} data point has exceeded safety limit`
    } else if (warningDataSize>1){
        warningText.innerText = `${warningDataSize} data points have exceeded safety limit`
    }
    metricsDiv.appendChild(warningText)
}


// Shortcut keys
let pauseChart = false
document.addEventListener("keypress",(e)=>{
    console.log(`You pressed ${e.key}`)
    // if (e.key == " "){
    //     pauseChart = !pauseChart
    //     if(pauseChart){
    //         document.querySelectorAll("canvas#chartCanvas").forEach((canvas)=>{
    //             let chart = Chart.getChart(canvas)
    //             clearInterval(chart.autoAddData)
    //             clearInterval(chart.autoUpdate)
    //             console.log(canvas,chart)
    //         })
    //     } else {
    //         document.querySelectorAll("canvas#chartCanvas").forEach((canvas)=>{
    //             let chart = Chart.getChart(canvas)
    //             chart.autoAddData = setInterval(()=>{chart.autoAddDataFunction()}, chart.autoUpdateInterval)
    //             chart.autoUpdate = setInterval(()=>{chart.autoUpdateFunction()}, chart.autoUpdateInterval)
    //         })
    //     }

    // }
})

// document.querySelectorAll(".pageButtons").forEach((pageButton)=>{
//     pageButton.addEventListener("click",()=>{

//     })
// })

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