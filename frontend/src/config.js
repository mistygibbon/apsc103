import dashboard from './templates/dashboard.htm'
import metrics from './templates/metrics.htm'
import graphs from './templates/graphs.htm'
import settings from './templates/settings.htm'

let localStorageConfig = localStorage.getItem("config")
const defaultConfig = {
    version: 1,
    APIurl: "",
    pages : {
        dashboard: {
            templateLink: dashboard,

        },
        metrics: {
            templateLink: metrics
        },
        graphs: {
            templateLink: graphs,

        },
        settings: {
            templateLink: settings,
        }

    },
    metrics: {
        temperature: {
            graph: true,
        },
        velocity: {
            graph: true,
        },
        distanceTravelled: {
            graph: true,
        },
        acceleration: {
            graph: false,
        },
        pressure: {
            graph: false,
        },
        voltage: {
            graph: false,
        }
    },
    settings: {
        darkMode: {
            name: "Dark mode",
            value: false,
        },
        mute: {
            name: "Mute",
            value: false,
        },
    },
    get graphMetrics() {
        let metricName = Object.getOwnPropertyNames(this.metrics)
        let graphMetrics = metricName.filter(metric=>this.metrics[metric].graph)
        return graphMetrics
    },
    get metricNames() {
        return Object.getOwnPropertyNames(this.metrics)
    },
}
function storeConfig (){localStorage.setItem("config", JSON.stringify(config))}

var config

if (localStorageConfig == null||localStorageConfig.version<defaultConfig.version){
    config = defaultConfig
    storeConfig()
} else {
    config = JSON.parse(localStorageConfig)
}

document.addEventListener("visibilitychange",()=>{storeConfig()})

Object.defineProperty(config,"graphMetrics",{
    get: function(){
        let metricName = Object.getOwnPropertyNames(this.metrics)
        let graphMetrics = metricName.filter(metric=>this.metrics[metric].graph)
        return graphMetrics
    }
})
Object.defineProperty(config,"metricNames",{
    get: function(){
        return Object.getOwnPropertyNames(this.metrics)
    }
})

console.log(defaultConfig)

export {config}