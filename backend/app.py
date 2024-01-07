
from flask import Flask, jsonify



app = Flask(__name__)
@app.route('/members')
def members():
	return {"abc": [1, 2, 3]}

	

if __name__ == '__main__':
	app.run(debug=True)
