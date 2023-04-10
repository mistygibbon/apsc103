import { config } from "../config"
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
        localStorage.clear()
    })
    return button
}

function generateInput(settings){
    if (settings.type == "boolean"){
        return `
            <label class="switch">
                <input type="checkbox" checked="${settings.value}}">
                <span class="slider round"></span>
            </label>
        `
    }
}

function generateSettings(settings, container){
    html = `
    <div class="option">
    <p class="optionText">${settings.name}}</p>
        ${generateInput(settings)}
    </div>
    ` 
    container.innerHTML += html
}

export {exportDataButton, clearLocalStorageButton}