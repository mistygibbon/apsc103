from flask import Flask
from markupsafe import escape
from flask import render_template, jsonify, request
import json
import asyncio
import sys

app = Flask(__name__)

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
counter = 0
start = 0
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/start/<key>")
def index(key):
    if (key=="helllo"):
        # asyncio.run(main())
        global start
        start = 1
        return "Started successfully"

@app.route("/stop/<key>")
def stop(key):
    if (key=="helllo"):
        # global task
        # task.cancel()
        global start, counter
        counter = 0
        start = 0
        return "Stopped successfully"

@app.route('/api/<metricName>/')
def show(metricName):
    global start, counter
    if start == 1:
        counter += 1
        return jsonify(data[metricName][0:counter])
    elif start == 0:
        return "app has not started"

@app.route('/api/')
def showAll():
    global start, counter
    if start == 1:
        counter += 1
        return jsonify(data)
    elif start == 0:
        return "app has not started"