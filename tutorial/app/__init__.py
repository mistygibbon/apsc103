from flask import Flask
# From config.py import Config class
from config import Config

# Creates application object as an instance of class Flask imported from flask package.
# __name__ is a Python predefined variable equal to the name of the module which it is used
app = Flask(__name__)

# use Config class for app config
app.config.from_object(Config)

# Import routes module
# app is a member in the tutorial package
from app import routes
