import { addTemperatureData, temperatureChart} from "./temperature"
import { addRandomData, shiftChart } from "./chartManipulation"
import {Chart} from 'chart.js';

let button = document.querySelector("button#addRandomData")
button.addEventListener("click", ()=>{shiftChart(addRandomData(temperatureChart),100).update()})
let intervalId = setInterval(()=>{shiftChart(addRandomData(temperatureChart),100).update()}, 1000)
let buttonStopAuto = document.querySelector("button#stopAuto")
buttonStopAuto.addEventListener("click", ()=>{clearInterval(intervalId)})

// let p = document.querySelector("div#timeline-container p#pod")
// p.style.marginLeft = "10px"
// let margin = -10
// function addMargin(){
//     margin += 1
//     if (margin >= p.parentElement.clientWidth){margin = -10}
//     p.style.marginLeft = `${margin}px`
// }
// setInterval(addMargin,10)