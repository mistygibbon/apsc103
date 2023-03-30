import { shiftChart, addRandomData, removeLastData } from "../chartManipulation"

function chartSelectionDropdown(chart){
    let select = document.createElement("select")
    select.name = "Number of Elements"
    select.classList = "chartControl"
    let charts = ["Velocity", "Temperature", "Distance Travelled", "Acceleration", "Pressure"]
    charts.forEach((chartName)=>{
        const tempOption = document.createElement("option")
        tempOption.innerText = chartName
        tempOption.setAttribute("value", chartName)
        if (camelize(chartName)==chart.name){
            tempOption.setAttribute("selected", "selected")
        }
        select.appendChild(tempOption)
    })
    select.addEventListener("change",(e)=>{
        newChartName = e.target.value
        chart.name = newChartName
        
    })
    return select
}

var camelize = function camalize(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

function addRandomDataButton(chart){
    let button = document.createElement("button")
    button.innerText = "Add random data"
    button.classList = "chartControl"
    button.addEventListener("click", ()=>{
        shiftChart(addRandomData(chart), 50).update()
    })
    return button
}

function removeLastDataButton(chart){
    let button = document.createElement("button")
    button.innerText = "Delete last data"
    button.classList = "chartControl"
    button.addEventListener("click", ()=>{
        removeLastData(chart).update()
    })
    return button
}

function pauseAutoUpdateButton(chart){
    let button = document.createElement("button")
    button.innerText = "Pause update"
    button.classList = "chartControl"
    button.addEventListener("click", (e)=>{
        clearInterval(chart.autoUpdate)
        button.insertAdjacentElement("afterend",resumeAutoUpdateButton(chart))
        button.parentNode.removeChild(button)
    })
    return button
}

function resumeAutoUpdateButton(chart){
            // clearInterval(chart.autoupdate)
        // e.target.innerText = "Resume update"
        // e.target.addEventListener("click", ()=>{
        //     chart.autoupdate = setInterval(()={console.log("a")}, 1000)
        //     e.target.innerText = "Pause update"
        // })
    let button = document.createElement("button")
    button.innerText = "Resume update"
    button.classList = "chartControl"
    button.addEventListener("click", (e)=>{
        chart.autoUpdate = setInterval(()=>{chart.autoUpdateFunction()}, chart.autoUpdateInterval)
        button.insertAdjacentElement("afterend",pauseAutoUpdateButton(chart))
        button.parentNode.removeChild(button)
    })
    return button
}

function viewElementsDropdown(chart, maxItems=100, defaultItems=50){
    let select = document.createElement("select")
    select.name = "Number of Elements"
    select.classList = "chartControl"
    for (let i = 1; i < maxItems+1; i++){
        const tempOption = document.createElement("option")
        tempOption.innerText = i
        tempOption.setAttribute("value", i)
        if (i==defaultItems){
            tempOption.setAttribute("selected", "selected")
        }
        select.appendChild(tempOption)
    }
    select.addEventListener("change", (e)=>{
        console.log(e.target.value)
        chart.visiblePoints = e.target.value
        shiftChart(chart, e.target.value).update()
    })
    return select
}

export{addRandomDataButton, pauseAutoUpdateButton, resumeAutoUpdateButton, viewElementsDropdown, removeLastDataButton, chartSelectionDropdown}