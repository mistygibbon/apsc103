import dashboard from './templates/dashboard.html'
import graphs from './templates/graphs.html'
import settings from './templates/settings.html'
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
    console.log(html)
    contentContainer.innerHTML = html
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export {showPage}