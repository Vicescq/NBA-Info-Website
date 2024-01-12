from flask import Flask, render_template, jsonify, request
from home_functions import *
import time

app = Flask(__name__)

@app.route("/homedata")
def home():
    
    data = package_home_data()
    return data

if __name__ == "__main__":
    app.run(debug=True) 



