// import {temperatureChart} from "./temperature.js"
import {Chart, elements, scales} from 'chart.js/auto';

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



import {cache as metricsData} from './backendAPI'

async function initializeConfig(name, data){
    if (data===undefined){
        // data = await fetchData(name)
        data = [{time:0, value:0}]
        console.log(data)
    }
    const config = {
        type: 'line',
        data: {
            labels: data.map(entry=>entry.time),
            datasets: [{
                label: name.titleCase(),
                data: data.map(entry=>entry.value),
                borderColor: "red",
                tension: 0.3,
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
            interaction: {
                axis: 'x',
                mode: 'nearest',
                intersect: false
            },
            scales: {
                x: {
                    type: "linear",
                    ticks: {
                        stepSize: 1
                    },
                },
                y: {
                    min: 0
                }
            }
        },
        plugins: []
    }
    return config
}

async function replaceData(chart, data){
    chart.data.labels = data.map(entry=>entry.time)
    chart.data.datasets[0].data = data.map(entry=>entry.value)
}

async function createChart(name, data, canvas){
    const config = await initializeConfig(name, data)
    if (canvas == undefined){
        var chart = new Chart(document.getElementById(name), config)
    } else {
        var chart = new Chart(canvas, config)
    }
    chart.name = name
    chart.counter = 0
    chart.visiblePoints = 50
    chart.autoUpdateInterval = 1000
    Chart.prototype.autoAddDataFunction = function(){
        replaceData(this,getMetricsData(this.name, this.visiblePoints))
        // autoAddData(this,this.visiblePoints)
        // shiftChart(this,this.visiblePoints)
    }
    chart.autoAddData = setInterval(()=>{chart.autoAddDataFunction()}, chart.autoUpdateInterval)

    Chart.prototype.autoUpdateFunction = function(){this.update('none')}
    chart.autoUpdate = setInterval(()=>{chart.autoUpdateFunction()}, chart.autoUpdateInterval)

    return chart
}

function autoAddData(chart,visiblePoints){
    let newData = metricsData[chart.name].map(element=>element)
    console.log(newData)
    let time = newData.map(entry=>entry.time).slice(-visiblePoints)
    let value = newData.map(entry=>entry.value).slice(-visiblePoints)

    let index = time.findIndex(element=>element==chart.data.labels.at(-1))
    console.log(chart.data.datasets[0].data.at(-1),value.at(index), index)
    if (chart.data.datasets[0].data.at(-1)==value[index]||index==-1){
        if(index >= newData.length-1){
            return
        }
        let timeNew = time.slice(index+1)
        let valueNew = value.slice(index+1)
        if (chart.pause==false){
            addData(chart, timeNew, valueNew)
        }
    } else {
        addData(chart, time, value)
    }
    return chart

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
    // console.log(data.labels, data.datasets[0].data)
    return chart
}

function removeLastData(chart){
    let data = chart.data
    data.labels.pop()
    data.datasets[0].data.pop()
    return chart
}

function addData(chart, label, data) {
    chart.data.labels.push(...label);
    chart.data.datasets[0].data.push(...data);
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

function getMetricsData(name,size){
    console.log(name,size)
    return metricsData[name].slice(-size)
}

export{addRandomData, shiftChart, createChart, createChartControls, removeLastData, initializeConfig, replaceData, getMetricsData, addData}