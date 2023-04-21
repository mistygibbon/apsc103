import dashboard from './templates/dashboard.htm'
import graphs from './templates/graphs.htm'
import settings from './templates/settings.htm'
import { config } from './config'

async function showPage(name){
    document.title = `${capitalizeFirstLetter(name)} - Hyperloop GUI`
    document.querySelector(".currentPage").remove()
    let div = document.createElement("div")
    div.className = "currentPage"
    document.getElementById(name).appendChild(div)
    let contentContainer = document.querySelector(".contentContainer")
    let response = await fetch(config.pages[name].templateLink)
    let html = await response.text()
    console.groupCollapsed("Fetched HTML")
    console.log(html)
    console.groupEnd()
    contentContainer.innerHTML = html
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export {showPage}