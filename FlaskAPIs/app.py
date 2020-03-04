from flask import Flask, render_template, request, jsonify, url_for,redirect
import re
# from flask_cors import CORS
import pymongo
from pymongo import MongoClient
import flaskConfig as fc


app = Flask(__name__)

cluster = MongoClient(fc.mongoDB['client'])
db = cluster["test"]

@app.route('/api/companySearch',methods=['GET'])
def searchCompany():
    qry= request.args.get('q')
    companies = db['SnP500Companies']
    test = []
    rgx = re.compile('.*' +qry+'.*', re.IGNORECASE)  # compile the regex
    for x in companies.find({'name': rgx}):
        test.append(
            {'name': x['name'],
            'symbol':x['symbol']}
        )

    return jsonify({'result': test})
    

if __name__ == '__main__':
    app.run(debug = True, port = 8080)