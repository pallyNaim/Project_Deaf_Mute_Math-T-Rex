from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)

@app.route("/")
def register():
    return render_template("register.html")


@app.route("/home")
def home():
    return render_template('index.html')

@app.route("/money")
def money():
    return render_template('money.html')

if __name__ == "__main__":
    app.run(debug=True)
