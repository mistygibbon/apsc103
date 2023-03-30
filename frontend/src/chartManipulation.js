// import {temperatureChart} from "./temperature.js"
import {Chart, elements} from 'chart.js/auto';

// This json file is used for default data when fetch fails
import temperatureData from './data/temperature.json'

import {
    addRandomDataButton, 
    pauseAutoUpdateButton, 
    resumeAutoUpdateButton, 
    viewElementsDropdown, 
    removeLastDataButton,
    chartSelectionDropdown,
} from './components/chartControlsComponents'

function initializeConfig(name, data){
    const config = {
        type: 'line',
        data: {
            labels: data.map(entry=>entry.time),
            datasets: [{
                label: name,
                data: data.map(entry=>entry.value),
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
            animation: {
                duration: 200
            },
            responsive: true,
            maintainAspectRatio: false,
    
        },
        plugins: []
    }
    return config
}

async function createChart(name, data, canvas){
    
    if (data===undefined){
        data = await fetchData(name)
        console.log(data)
    }

    const config = initializeConfig(name, data)

    if (canvas == undefined){
        var chart = new Chart(document.getElementById(name), config)
    } else {
        var chart = new Chart(canvas, config)
    }
    chart.name = name
    chart.visiblePoints = 50
    chart.autoUpdateInterval = 1000
    Chart.prototype.autoAddDataFunction = function(){addRandomData(this)}
    chart.autoAddData = setInterval(()=>{chart.autoAddDataFunction()}, chart.autoUpdateInterval)

    Chart.prototype.autoUpdateFunction = function(){shiftChart(this,this.visiblePoints).update()}
    chart.autoUpdate = setInterval(()=>{chart.autoUpdateFunction()}, chart.autoUpdateInterval)

    return chart
}

async function fetchData(name) {
    return fetch(`./src/data/${name}.json`).then(
        async (response) => {
            let json = await response.json();
            return json
        }
    ).catch((err) => {
        console.log(err);
        return temperatureData
    })
}

function createChartControls(chart){
    let buttons = [
            chartSelectionDropdown,
            pauseAutoUpdateButton, 
            viewElementsDropdown, 
            // addRandomDataButton, 
            // removeLastDataButton
        ]
    buttons.forEach((button)=>{
        console.log(button)
        chart.canvas.parentElement.parentElement.appendChild(button(chart))
    })
}


function addRandomData(chart){
    let num = Math.floor(Math.random() * 50)
    let data = chart.data
    data.labels.push(data.labels.at(-1)+1)
    data.datasets[0].data.push(num)
    console.log(data.labels, data.datasets[0].data)
    return chart
}

function removeLastData(chart){
    let data = chart.data
    data.labels.pop()
    data.datasets[0].data.pop()
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

export{addRandomData, shiftChart, createChart, createChartControls, removeLastData}