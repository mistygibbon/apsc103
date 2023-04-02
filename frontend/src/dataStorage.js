




function storeConfig(key, value){
    localStorage.setItem(key, value)
}

function getConfig(key){
    localStorage.getItem(key)
}

function storeShit(){
    storeConfig("name", 111)
}

export{storeShit}