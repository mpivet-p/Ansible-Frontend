# flask_web/app.py

from flask import Flask, render_template, request, redirect, make_response
from datetime import datetime
import requests
import json
import time
import sqlite3

uid = ""
secret = ""
target_time = 1644849720
target_date = datetime.fromtimestamp(target_time)

app = Flask(__name__)

@app.route('/', methods = ['GET'])
def main():
    return render_template("page.html")

@app.route('/results', methods = ['GET'])
def results():
    bearer_token = request.cookies.get('42_token')
    infos = get_bearer_infos(bearer_token)
    if infos == None:
        return redirect("https://42crush.mpivet-p.com")
    db = sqlite3.connect('crush.db')
    cursor = db.cursor()
    cursor.execute("SELECT crush FROM users WHERE login=?;", (infos["login"],))
    rows = cursor.fetchall()
    cursor.execute("SELECT crush FROM users WHERE login=?;", (rows[0][0],))
    rows = cursor.fetchall()
    cursor.close()
    if len(rows) == 1:
        if rows[0][0] == infos["login"]:
            return render_template("base.html", msg="Parece que tu crush es mutuo. Ve a hablar con el/ella !")
    return render_template("base.html", msg="Tu crush no ha registrado tu nombre. Tal vez el/ella simplemente no participa")

@app.route('/crush', methods = ['POST'])
def crush():
    bearer_token = request.cookies.get('42_token')
    crush = request.form.get('login')
    infos = get_bearer_infos(bearer_token)
    if infos == None:
        return redirect("https://42crush.mpivet-p.com")
    vote(infos["login"], crush)
    return render_template("base.html", msg="Hemos grabado tu crush. Vuelva el {:s} para ver si es mutuo"\
            .format(target_date.strftime("%d/%m a las %H:%M")))


def vote(login, crush):
    db = sqlite3.connect('crush.db')
    cursor = db.cursor()
    cursor.execute("""
        INSERT OR REPLACE INTO users
            (login, crush)
        VALUES
            (?, ?);""", (login, crush))
    db.commit()
    cursor.close()

def get_bearer_infos(bearer_token):
    url = "https://api.intra.42.fr/v2/me"
    headers = {"Authorization": "Bearer " + bearer_token}
    rep = requests.get(url, headers=headers)
    infos = rep.json()
    if rep.status_code != 200:
        return (None)
    return (infos)


@app.route('/auth')
def auth():
    code = request.args.get("code")

    url = "https://api.intra.42.fr/oauth/token"
    payload = {"grant_type": "authorization_code",
                "client_id": uid,
                "client_secret": secret,
                "code": code,
                "redirect_uri": "https://42crush.mpivet-p.com/auth"}
    rep = requests.post(url, json=payload, data=payload)
    content = rep.json()
    if rep.status_code == 200:
        bearer_token = content["access_token"]
        infos = get_bearer_infos(bearer_token)
        if rep.status_code == 200:
            if time.time() >= target_time:
                resp = make_response(redirect("https://42crush.mpivet-p.com/results"))
            else:
                resp = make_response(render_template("form.html", login=infos["login"]))
            resp.set_cookie('42_token', bearer_token)
            return resp
    return "Authentication error"


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5043)
