// This handles the initial colour settings of the page and also handles when user changes prefers color scheme
// The function for handling changing color scheme settings is in settings components
let userPreference = null
if (localStorage.getItem("config")){
    userPreference = JSON.parse(localStorage.getItem("config")).settings.colorScheme.value
}
const colorSchemeQueryList = window.matchMedia('(prefers-color-scheme: dark)');
const setColorScheme = e => {
    if (userPreference == "default" || userPreference == null){
    if (e.matches) {
      // Dark
      console.log('Dark mode')
      document.querySelector("html").classList = "darkMode"
    } else {
      // Light
      console.log('Light mode')
      document.querySelector("html").classList = "lightMode"
    }
  } else {
    if (userPreference == "light"){
        document.querySelector("html").classList = "lightMode"
    } else if (userPreference == "dark"){
        document.querySelector("html").classList = "darkMode"
    }
  }
}
    
setColorScheme(colorSchemeQueryList);
colorSchemeQueryList.addEventListener('change', setColorScheme);



// function changeColorScheme(){
//     document.querySelectorAll("*").forEach((item)=>{item.classList.add("notransition")})
//     let displayMode = JSON.parse(localStorage.getItem("config")).settings.colorScheme.value
//     let html = document.querySelector("html")
//     // let body = document.querySelector("body")
//     // body.style.display = "none"
//     if (displayMode == "dark"){
//         html.classList.remove("lightMode")
//         html.classList.add("darkMode")
//     } else if (displayMode == "light"){
//         html.classList.remove("darkMode")
//         html.classList.add("lightMode")
//     } else if (displayMode == "default"||displayMode == undefined){
//         html.classList.remove("darkMode")
//         html.classList.remove("lightMode")
//     }

//     setTimeout(()=>{document.querySelectorAll("*").forEach((item)=>{item.classList.remove("notransition")})},500)
// }

// changeColorScheme()