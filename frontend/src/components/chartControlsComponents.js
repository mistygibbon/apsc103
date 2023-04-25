import { shiftChart, addRandomData, removeLastData, initializeConfig, replaceData, getMetricsData } from "../chartManipulation"
import { config } from "../config"

let pageName = location.hash.substring(1)

String.prototype.titleCase = function(){
    const text = this;
    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult
}

String.prototype.camelize = function () {
    return this.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

function chartSelectionDropdown(chart){
    let select = document.createElement("select")
    select.name = "Number of Elements"
    select.classList = "chartControl"
    let charts = config.graphMetrics
    charts.forEach((chartName)=>{
        const tempOption = document.createElement("option")
        tempOption.innerText = chartName.titleCase()
        tempOption.setAttribute("value", chartName)
        if (chartName==chart.name){
            tempOption.setAttribute("selected", "selected")
        }
        select.appendChild(tempOption)
    })
    select.addEventListener("change",(e)=>{
        let newChartName = e.target.value
        chart.name = newChartName
        chart.data.datasets[0].label = newChartName.titleCase()
        // replaceData(chart, getMetricsData(newChartName,chart.visiblePoints))
        chart.autoAddDataFunction()
        chart.update()
    })
    return select
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
        console.log(chart)
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

function viewElementsDropdown(chart, maxItems=500, defaultItems=50){
    let select = document.createElement("select")
    select.name = "Number of Elements"
    select.classList = "chartControl"

    for (let i = 10; i < maxItems+1; i+=10){
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
        chart.autoAddDataFunction()
        chart.update()
    })
    return select
}

export{addRandomDataButton, pauseAutoUpdateButton, resumeAutoUpdateButton, viewElementsDropdown, removeLastDataButton, chartSelectionDropdown}