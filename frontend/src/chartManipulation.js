// import {temperatureChart} from "./temperature.js"
import {Chart, elements} from 'chart.js/auto';
import temperatureData from './data/temperature.json'


async function createChart(name, data){
    
    if (data===undefined){
        data = await fetchData(name)
        console.log(data)
    }

    const config = {
        type: 'line',
        data: {
            labels: data.map(entry=>entry.time),
            datasets: [{
                label: "name",
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
    return new Chart(document.getElementById(name), config)
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
    let addRandomDataButton = document.createElement("button")
    addRandomDataButton.innerText = "Add random data"
    addRandomDataButton.addEventListener("click", ()=>{
        shiftChart(addRandomData(chart), 50).update()
    })
    chart.canvas.parentElement.insertAdjacentElement("afterend",addRandomDataButton)
}


function addRandomData(chart){
    let num = Math.floor(Math.random() * 50)
    let data = chart.data
    data.labels.push(data.labels.at(-1)+1)
    data.datasets[0].data.push(num)
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

export{addRandomData, shiftChart, createChart, createChartControls}