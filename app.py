from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)

@app.route("/")
def register():
    return render_template("register.html")


@app.route("/home")
def home():
    return render_template('index.html')

@app.route("/forum")
def forum():
    return render_template('forum.html')

@app.route("/announcements")
def announcements():
    return render_template('announcements.html')

@app.route("/profile")
def profile():
    return render_template('profile.html')



if __name__ == "__main__":
    app.run(debug=True)