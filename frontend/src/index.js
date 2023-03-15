import { addTemperatureData } from "./temperature"

let button = document.querySelector("button#addRandomData")
button.addEventListener("click", addTemperatureData)
let intervalId = setInterval(addTemperatureData, 1000)
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