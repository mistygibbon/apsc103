import { config, storeConfig } from "../config"
import { saveAs } from 'file-saver';
import { fetchAllData } from "../backendAPI";

function getTimestamp(){
    var d = new Date();

    return `${d.getFullYear()}-${('0' + (d.getMonth()+1)).slice(-2)}-${('0' + d.getDate()).slice(-2)} 
    ${('0' + (d.getHours())).slice(-2)}${('0' + (d.getMinutes())).slice(-2)}`;
}

function exportDataButton(){
    let button = document.createElement("button")
    button.innerText = "Export data"
    button.classList = "mainButton"
    button.addEventListener("click",()=>{
        var blob = new Blob([JSON.stringify(fetchAllData(),null,2)],
                { type: "text/plain;charset=utf-8" });

        saveAs(blob, `HyperloopGUI ${getTimestamp()}.json`);
    })
    return button
}

function clearLocalStorageButton(){
    let button = document.createElement("button")
    button.innerText = "Clear Local Storage"
    button.classList = "mainButton"
    button.addEventListener("click",()=>{
        if (confirm("This will return all settings to default. Click OK to continue.")){
        document.removeEventListener("visibilitychange",storeConfig)
        localStorage.clear()
        console.log("Settings deleted")
        }
        
    })
    return button
}

function generateInput(settings){
    if (settings.type == "boolean"){
        let label = document.createElement("label")
        label.classList = "switch"
        let input = document.createElement("input")
        input.type = "checkbox"
        if (settings.value){
        input.setAttribute("checked",settings.value)
        }
        input.addEventListener("change",(e)=>{
            console.log(e.target.checked)
            settings.value = e.target.checked
            postChange(settings)
        })
        let span = document.createElement("span")
        span.classList = "slider round"
        label.appendChild(input)
        label.appendChild(span)
        console.log(label)
        return label
        // `
        //     <label class="switch">
        //         <input type="checkbox" checked="${settings.value}}">
        //         <span class="slider round"></span>
        //     </label>
        // `
    }
    if (settings.type = "select"){
        let select = document.createElement("select")
        let options = settings.options
        options.forEach((option)=>{
            const tempOption = document.createElement("option")
            tempOption.innerText = option.name
            tempOption.setAttribute("value", option.value)
            if (option.value==settings.value){
                tempOption.setAttribute("selected", "selected")
            }
            select.appendChild(tempOption)
        })
        select.addEventListener("change",(e)=>{
            console.log(e.target.value)
            settings.value = e.target.value
            postChange(settings)
        })
        return select
    }
    if (settings.type = "number"){
        let input = document.createElement("input")
        input.type = "number"
        return input
    }
    throw console.error(`No settings type for ${settings}`);
}

function generateSettingsItems(settings){
//     <div class="option">
//     <p class="optionText">Dark mode</p>
//     <label class="switch">
//         <input type="checkbox">
//         <span class="slider round"></span>
//     </label>
// </div>
    let div = document.createElement("div")
    div.classList = "option"
    div.innerHTML = `
    <p class="optionText">${settings.name}</p>
    ` 
    div.appendChild(generateInput(settings))
    return div
}

function postChange(settings){
    switch (settings.id) {
        case "colorScheme":
            let displayMode = settings.value
            let html = document.querySelector("html")
            if (displayMode == "dark"){
                html.classList.remove("lightMode")
                html.classList.add("darkMode")
            } else if (displayMode == "light"){
                html.classList.remove("darkMode")
                html.classList.add("lightMode")
            } else if (displayMode == "default"){
                if (window.matchMedia('(prefers-color-scheme: dark)')){
                    html.classList = "darkMode"
                } else {
                    html.classList = "lightMode"
                }
            }
            break;
        default:
            console.log(settings)
            break;
    }
}

function getDarkMode(){
    let isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    let configValue = config.settings.darkMode.value
    if(configValue == undefined||configValue=="default"){
        return isSystemDark ? "dark":"light"
    } else {
        return configValue
    } 
}

function configEditTextBox(){
    let div = document.createElement("div")
    let textarea = document.createElement("textarea")
    textarea.innerText = JSON.stringify(config, null, 2)
    return textarea
}

// function generateSafetyLimit(){
//     div = document.createElement("div")
//     div.innerHTML = "<h2>Safety Limit</h2>"
//     config.metricNames.forEach((metricName)=>{
//         let innerDiv = document.createElement("div")
//         innerDiv.classList = "option"
//         innerDiv.innerHTML = `
//         <p class="optionText">${metricName}</p>
//         ` 
//         let settings = {
//             type: "number",
//             value: config.metrics[metricName].safetyLimit
//         }
//         innerDiv.appendChild(generateInput(settings))
//         div.appendChild(innerDiv)
//     })
//     return div
// }

export {exportDataButton, clearLocalStorageButton, generateSettingsItems, configEditTextBox}