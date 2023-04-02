import temperatureData from './data/temperature.json'
import velocityData from './data/temperature.json'
import testData from './data/testData.json'

let data = {
    "distance": [],
    "velocity": [],
    "temperature": [],
}


function feedTestData(name){
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
        
        feedTestData(name)
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


feedTestData("distance")
feedTestData("velocity")
feedTestData("temperature")


async function fetchData(name,start) {
    return fetch(`./src/data/${name}.json`).then(
        async (response) => {
            let json = await response.json();
            return json
        }
    ).catch((err) => {
        console.log(err);
        return data[name]
    })
}

async function fetchDataLatest(name) {
    return fetch(`./src/data/${name}/latest`).then(
        async (response) => {
            let json = await response.json();
            return json
        }
    ).catch((err) => {
        console.log(err);
        return temperatureData
    })
}

export {fetchData, fetchDataLatest, feedTestData, data}