import temperatureData from './data/temperature.json'
import velocityData from './data/temperature.json'
import testData from './data/testData.json'
import { config } from './config'
import { addData } from './chartManipulation'
import alertAudio from './audio/prompt.wav'
import favicon from "./images/favicon.ico"
import additionalData from "./data/additionalMetrics.json"

let APIurl = config.APIurl
let started = false
let data = {}

config.metricNames.forEach((metricName)=>{
    if (Array.isArray(testData[metricName])){
        data[metricName] = []
    } 
})

let cache = {
    ...additionalData,
    timeValueSplit: function(name){
        return [this[name].map(entry=>entry.time),this[name].map(entry=>entry.time)]
    }
}
config.metricNames.forEach((metricName)=>{
    if (Array.isArray(testData[metricName])){
        cache[metricName] = []
    } 
})

let timeouts = {}

function feedTestMetric(name){
    timeouts[name] = setTimeout(()=>{
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

function startFeedTestMetric(){
    if (config.APIurl == ""){
        config.graphMetrics.forEach((metricName)=>{
            feedTestMetric(metricName)
        })
    } else {
        fetch(`${APIurl}/start/helllo`).then(
            (response)=>{
                console.group("API start response")
                console.log(response)
                console.groupEnd
                started = true
            }
        )
    }
}

function stopFeedTestMetric(){
    console.log(timeouts)
    config.graphMetrics.forEach((metricName)=>{
        clearTimeout(timeouts[metricName])
        data[metricName] = []
        warningData[metricName]=[]
        fetch(`${APIurl}/stop/helllo`)
        started = false
    })
}


async function fetchData(name) {
    if(config.APIurl==""){
        return data[name]
    }
    if (started == false){
        return []
    }
    let response = await fetch(`${APIurl}/api/${name}`)
    console.groupCollapsed("API response")
    console.log(response)
    data = await response.json()
    console.log(data)
    console.groupEnd()
    return data

    //     (response)=>{
    //         console.groupCollapsed("API response")
    //         console.log(response)
    //         response.json().then((data)=>{console.log(data);return data})
    //         console.groupEnd()
    //     }
    //     // async (response) => {
    //     //     let json = await response.json();
    //     //     return json
    //     // }

    // ).catch((err) => {
    //     console.log(err);
    // })
}

async function fetchAllData(){
    if(config.APIurl==""){
        return testData
    }
    // fetch(`${APIurl}/api`).then(
    //     (response)=>{
    //         console.groupCollapsed("API response")
    //         console.log(response)
    //         response.json().then((data)=>{console.log(data);return data})
    //         console.groupEnd()
    //     }
    //     // async (response) => {
    //     //     let json = await response.json();
    //     //     return json
    //     // }

    // ).catch((err) => {
    //     console.log(err);
    // })
    let response = await fetch(`${APIurl}/api/`)
    let data = await response.json()
    return data
}

let warningData = {}
config.metricNames.forEach((metricName)=>{
    warningData[metricName] = []
})

async function update(name){
    cache[name] = await fetchData(name)
    window.fetchData = fetchData
    cache[name].forEach((datapoint)=>{
        let upperSafetyLimit, lowerSafetyLimit 
        if (config.metrics[name].upperSafetyLimit || config.metrics[name].lowerSafetyLimit){
            upperSafetyLimit = config.metrics[name].upperSafetyLimit
            lowerSafetyLimit = config.metrics[name].lowerSafetyLimit
        }
        if(datapoint.value > upperSafetyLimit ){
            if (warningData[name].find(element=>element.time.toFixed(2)==datapoint.time.toFixed(2))==undefined){
                warningData[name].push(datapoint)
                if (config.settings.enableNotifications.value){
                    const warning = new Notification('Warning from Hyperloop GUI',{
                        body: `${name.titleCase()} exceeded safety limit of ${upperSafetyLimit} at time ${datapoint.time}`,
                        icon: favicon
                    });
                }
                if (config.settings.mute.value==false){
                    let audio = new Audio(alertAudio)
                    audio.play()
                }
            }
        } else if (datapoint.value < lowerSafetyLimit) {
            if (warningData[name].find(element=>element.time.toFixed(2)==datapoint.time.toFixed(2))==undefined){
                warningData[name].push(datapoint)
                if (config.settings.enableNotifications.value){
                    const warning = new Notification('Warning from Hyperloop GUI',{
                        body: `${name.titleCase()} under safety limit of ${lowerSafetyLimit} at time ${datapoint.time}`,
                        icon: favicon
                    });
                }
                if (config.settings.mute.value==false){
                    let audio = new Audio(alertAudio)
                    audio.play()
                }
            }
        }
    })
}
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

setInterval(()=>{
    config.graphMetrics.forEach(async(metric)=>{
        await update(metric)
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

export {fetchData, feedTestMetric, cache, fetchAllData, warningData, startFeedTestMetric, stopFeedTestMetric}