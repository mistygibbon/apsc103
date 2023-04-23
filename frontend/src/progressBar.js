import { cache } from "./backendAPI";
import { config } from "./config";
function changeWidth(){
    let progressBar = document.querySelector("div.progressBar")
    console.log("changing progress bar width",cache.distanceTravelled.at(-1))
    progressBar.style.width = `${cache.distanceTravelled.at(-1).value/10000}%`
    let value = document.querySelector("p.progressBarValue")
    value.innerText = `${+cache.distanceTravelled.at(-1).value.toFixed(2)}/1000000`
}
let interval
function progressBarStart(){
    interval = setInterval(changeWidth,1000)
} 
function progressBarStop(){clearInterval(interval)}

export {progressBarStart, progressBarStop}
