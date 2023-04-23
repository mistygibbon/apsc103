# APSC 103 Project - Hyperloop Digital GUI

https://mistygibbon.github.io/apsc103/

## Folders
\_\_pycache\_\_/
frontend/
static/
templates/
venv/

## Installation

``` bash
git clone
./venv/bin/activate
flask --app hello --debug run
```

## Frontend
backendAPI.js
data object: raw data object for simulating API
raw data is feed to the object by a JSON file and feedData function

cacheData = cacheObject to store data points

displayed data = object to store all data displayed

chart data = data that are shown directly onto charts

update chart function: push new data points from displayed data to chart data

State: running chart
store data to cacheData
add data to displayed data

State: paused chart
store data to cacheData
stop adding data to displayed data

A function should pull raw data to cacheData with interval, and add to displayed data and chart data depends chart is paused or not

A function should shift the chart data according to number of datapoints specified


configurations for each page: chart type, number of data points, paused?, display data

pause update should pause all request to the backend for that metric

fetch data 

## Backend
https://apsc103-production.up.railway.app

### Routes
| url                   | use                             |
| --------------------- | ------------------------------- |
| domain_name/api/metricName | Return all metric data       |
| domain_name/api/temperature  | Return last 50 temperature data |

parameters:
latest
## Resources
| Name             | Content                           | URL                                          |
| ---------------- | --------------------------------- | -------------------------------------------- |
| MDN Web Docs     | Anything                          | https://developer.mozilla.org/en-US/docs/Web |
| DevDocs          | Anything                          | https://devdocs.io/                          |
| The Odin Project | Step by step learning for web dev | https://www.theodinproject.com/              |
| Geek for Geeks   | Anything                          | https://www.geeksforgeeks.org/               |