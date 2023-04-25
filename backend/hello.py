from flask import Flask
from markupsafe import escape
from flask import render_template, jsonify, request
from flask_cors import CORS
import json
import asyncio
import sys

app = Flask(__name__)
CORS(app)

file = open('./testData.json')
data = json.load(file)

loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)


# returnData = {
#     "velocity": [],
#     "temperature": [],
#     "distanceTravelled": []
# }

# async def feedReturnData(name):
#     while (len(returnData[name])<len(data[name])):
#         insert = data[name][len(returnData[name])]
#         returnData[name].append(insert)
#         print(data[name][len(returnData[name])]["time"]-insert["time"], file=sys.stderr)
#         await asyncio.sleep((data[name][len(returnData[name])]["time"]-insert["time"]))\

# task = asyncio.gather(feedReturnData("velocity"),feedReturnData("temperature"),feedReturnData("distanceTravelled"))

# async def main():
    # await task
counter = {}
start = 0
counter["velocity"] = 0
counter["temperature"] = 0
counter["distanceTravelled"] = 0
counter["pressure"] = 0
counter["acceleration"] = 0

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/start/<key>")
def index(key):
    if (key=="helllo"):
        # asyncio.run(main())
        global start
        start = 1
        response = "Started successfully"
        return response

@app.route("/stop/<key>")
def stop(key):
    if (key=="helllo"):
        # global task
        # task.cancel()
        global start, counter
        counter["velocity"] = 0
        counter["temperature"] = 0
        counter["distanceTravelled"] = 0
        counter["pressure"] = 0
        counter["acceleration"] = 0
        start = 0
        response = "Stopped successfully"
        return response

@app.route('/api/<metricName>/')
def show(metricName):
    global start, counter
    if start == 1:
        counter[metricName] += 1
        response = jsonify(data[metricName][0:counter[metricName]])
        return response
    elif start == 0:
        response = "app has not started"
        return response

@app.route('/api/')
def showAll():
    global start, counter
    if start == 1:
        response = jsonify(data)
        return response
    elif start == 0:
        response = "app has not started"
        return response