var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},r=e.parcelRequire30ab;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in a){var r=a[e];delete a[e];var n={id:e,exports:{}};return t[e]=n,r.call(n.exports,n,n.exports),n.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){a[e]=t},e.parcelRequire30ab=r),r.register("1fsj3",(function(e,t){var a,n,s,l;a=e.exports,n="addTemperatureData",s=()=>u,Object.defineProperty(a,n,{get:s,set:l,enumerable:!0,configurable:!0});var o=r("2RVy2"),d=r("bGsqi");console.log(d);const i={type:"line",data:{labels:d.map((e=>e.time)),datasets:[{label:"temperature",data:d.map((e=>e.temperature)),borderColor:"red",tension:.3}]},options:{plugins:{legend:{display:!1}},responsive:!0,maintainAspectRatio:!1},plugins:[]},p=new(0,o.Chart)(document.getElementById("temperature"),i);function u(){let e=Math.floor(50*Math.random());data=p.data,data.labels.push(data.labels.at(-1)+1),data.labels.length>=20&&data.labels.shift(),data.datasets[0].data.push(e),data.datasets[0].data.length>=20&&data.datasets[0].data.shift(),console.log(data.labels,data.datasets[0].data),p.update("none")}})),r.register("bGsqi",(function(e,t){e.exports=JSON.parse('[{"time":0,"temperature":10},{"time":1,"temperature":22},{"time":2,"temperature":15},{"time":3,"temperature":25},{"time":4,"temperature":22},{"time":5,"temperature":34},{"time":6,"temperature":28}]')})),r("1fsj3");
//# sourceMappingURL=index.32959aed.js.map
