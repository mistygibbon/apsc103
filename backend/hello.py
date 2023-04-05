from flask import Flask
from markupsafe import escape
from flask import render_template, jsonify, request
import json

app = Flask(__name__)

file = open('./testData.json')
data = json.load(file)



@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/start/<key>")
def index():
    return "This is settings"

@app.route("/stop/<key>")
def stop():
    return
# @app.route('/hello/')
# @app.route('/hello/<name>')
# def hello(name=None):
#     return render_template('hello.html', name=name)

@app.route('/api/<metricName>/')
def show(metricName):
    return jsonify(data[metricName])