function changeColorScheme(){
    document.querySelectorAll("*").forEach((item)=>{item.classList.add("notransition")})
    let displayMode = JSON.parse(localStorage.getItem("config")).settings.colorScheme.value
    let html = document.querySelector("html")
    // let body = document.querySelector("body")
    // body.style.display = "none"
    if (displayMode == "dark"){
        html.classList.remove("lightMode")
        html.classList.add("darkMode")
    } else if (displayMode == "light"){
        html.classList.remove("darkMode")
        html.classList.add("lightMode")
    } else if (displayMode == "default"||displayMode == undefined){
        html.classList.remove("darkMode")
        html.classList.remove("lightMode")
    }

    setTimeout(()=>{document.querySelectorAll("*").forEach((item)=>{item.classList.remove("notransition")})},500)
}

changeColorScheme()