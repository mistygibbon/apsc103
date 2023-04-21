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


returnData = {
    "velocity": [],
    "temperature": [],
    "distanceTravelled": []
}

async def feedReturnData(name):
    while (len(returnData[name])<len(data[name])):
        insert = data[name][len(returnData[name])]
        returnData[name].append(insert)
        print(data[name][len(returnData[name])]["time"]-insert["time"], file=sys.stderr)
        await asyncio.sleep((data[name][len(returnData[name])]["time"]-insert["time"]))\

task = asyncio.gather(feedReturnData("velocity"),feedReturnData("temperature"),feedReturnData("distanceTravelled"))

async def main():
    await task

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/start/<key>")
def index(key):
    if (key=="helllo"):
        asyncio.run(main())
        return "Started"

@app.route("/stop/<key>")
def stop(key):
    if (key=="helllo"):
        global task
        task.cancel()
        return
# @app.route('/hello/')
# @app.route('/hello/<name>')
# def hello(name=None):
#     return render_template('hello.html', name=name)

@app.route('/api/<metricName>/')
def show(metricName):
    return jsonify(returnData[metricName])