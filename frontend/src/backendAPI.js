import temperatureData from './data/temperature.json'
import velocityData from './data/temperature.json'
import testData from './data/testData.json'
import { config } from './config'
import { addData } from './chartManipulation'

let data = {}
config.metricNames.forEach((metricName)=>{
    data[metricName] = []
})

let cache = {
    timeValueSplit: function(name){
        return [this[name].map(entry=>entry.time),this[name].map(entry=>entry.time)]
    }
}
config.metricNames.forEach((metricName)=>{
    cache[metricName] = []
})



function feedTestMetric(name){
    setTimeout(()=>{
        let metric = data[name]
        if (metric.length < testData[name].length){
            let insert = testData[name][metric.length]
            // console.log(name, insert, metric)
            metric.push(insert)
        } else {
            let insert = {time: metric.at(-1).time+1, value: getRandomData()}
            // console.log(insert,metric)
            metric.push(insert)
        }
        
        feedTestMetric(name)
    }, waitTime(name))
}

function waitTime(name){
    let metric = data[name]
    if (metric.length < testData[name].length){

    var nextItemTime = testData[name][metric.length]["time"]
    if (metric.length==0){
        var previousItemTime = 0
    } else {
        var  previousItemTime = testData[name][metric.length-1]["time"]
    }

    } else {
        return 1000
    }
    return (nextItemTime-previousItemTime)*1000
}

function getRandomData(){
    let num = Math.floor(Math.random() * 50)
    return num
}

if (config.APIurl == ""){
    config.graphMetrics.forEach((metricName)=>{
        feedTestMetric(metricName)
    })
}


function fetchData(name) {
    if(config.APIurl==""){
        return data[name]
    }
    return fetch(`./src/data/lol.json`).then(
        // async (response) => {
        //     let json = await response.json();
        //     return json
        // }

    ).catch((err) => {
        console.log(err);
    })
}

function fetchAllData(){
    if(config.APIurl==""){
        return testData
    }
    return fetch(`./src/data/lol.json`).then(
        // async (response) => {
        //     let json = await response.json();
        //     return json
        // }

    ).catch((err) => {
        console.log(err);
    })
}

function update(name){
    cache[name] = fetchData(name)
    // let charts = getChartArray().map().filter(chart=>chart.name==name)
    // let time = cache[name].map(entry=>entry.time)
    // let value = cache[name].map(entry=>entry.value)
    // charts.forEach((chart)=>{
    //     if (chart.pause==false){
    //         let index = time.findIndex(element=>element==chart.data.labels.at(-1))
    //         let timeNew = time.slice(index+1)
    //         let valueNew = value.slice(index+1)
    //         addData(chart, ...timeNew, ...valueNew)
    //     }
    //     console.log(chart,chart.data.datasets[0].data)
    // })
}

setInterval(()=>{
    config.graphMetrics.forEach((metric)=>{
        update(metric)
        // console.log(cache[metric])
    })
},1000)


// async function fetchDataLatest(name) {
//     return fetch(`./src/data/${name}/latest`).then(
//         async (response) => {
//             let json = await response.json();
//             return json
//         }
//     ).catch((err) => {
//         console.log(err);
//         return temperatureData
//     })
// }

export {fetchData, feedTestMetric, cache, fetchAllData}