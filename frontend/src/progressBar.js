import { cache } from "./backendAPI";
import { config } from "./config";
function changeWidth(){
    let progressBar = document.querySelector("div.progressBar")
    let value = document.querySelector("p.progressBarValue")
    if (progressBar&&cache.distanceTravelled.length!=0){
        // console.log("changing progress bar width",cache.distanceTravelled.at(-1))
        progressBar.style.width = `${(cache.distanceTravelled.at(-1).value/cache.totalDistance)*100}%`
        value.innerText = `${+cache.distanceTravelled.at(-1).value.toFixed(2)}/${cache.totalDistance}`
    } else if (cache.distanceTravelled.length==0){
        progressBar.style.width = `0`
        value.innerText = ``
    }
}
let interval
function progressBarStart(){
    changeWidth()
    interval = setInterval(changeWidth,1000)
} 
function progressBarStop(){clearInterval(interval)}

export {progressBarStart, progressBarStop}
