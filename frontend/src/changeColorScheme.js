import { config } from "./config"

function changeColorScheme(){
    document.querySelectorAll("*").forEach((item)=>{item.classList.add("notransition")})
    let displayMode = config.settings.colorScheme.value
    if (displayMode == "dark"){
        document.querySelector("body").classList.remove("lightMode")
        document.querySelector("body").classList.add("darkMode")
    } else if (displayMode == "light"){
        document.querySelector("body").classList.remove("darkMode")
        document.querySelector("body").classList.add("lightMode")
    } else if (displayMode == "default"){
        document.querySelector("body").classList.remove("darkMode")
        document.querySelector("body").classList.remove("lightMode")
    }

    setTimeout(()=>{document.querySelectorAll("*").forEach((item)=>{item.classList.remove("notransition")})},500)
}

changeColorScheme()