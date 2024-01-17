from flask import Flask, render_template, jsonify, request
from home_functions import *
import time

app = Flask(__name__)

@app.route("/homedata")
def home():
    data = package_home_data()
    
    return data

@app.route("/boxscore")
def boxscore():
    print({"test": 123})
    return {"test": 123}

if __name__ == "__main__":
    app.run(debug=True) 



