import dashboard from './templates/dashboard.html'
import metrics from './templates/metrics.html'
import graphs from './templates/graphs.html'
import settings from './templates/settings.html'

let localStorageConfig = localStorage.getItem("config")
const defaultConfig = {
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

if (localStorageConfig == null){
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

console.log(config, config.storeConfig)

export {config}