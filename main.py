from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from flask_sqlalchemy import SQLAlchemy

# MySQL database configuration
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mathlearning.db'

db = SQLAlchemy(app)

class User(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   username = db.Column(db.String(50), nullable=False)
   password = db.Column(db.String(50), nullable=False)
   user_type = db.Column(db.Enum('student', 'teacher'), nullable=False)
   email = db.Column(db.String(255))

@app.route('/') # Homepage
def homepage():
   return render_template('index.html')

@app.route('/gameTime') # Homepage
def gameTime():
   return render_template('clockgame.html')

@app.route('/gameMoney') # Homepage
def gameMoney():
   return render_template('moneyGame.html')
@app.route('/signup', methods=['GET', 'POST'])
def signup():
   if request.method == 'POST':
       username = request.form.get('Username')
       email = request.form.get('Email')
       password = request.form.get('Password')
       user_type = request.form.get('User')

       # Create a new user
       new_user = User(username=username, password=password, user_type=user_type, email=email)

       # Insert the new user into the database
       db.session.add(new_user)
       db.session.commit()

       flash('Registration successful!', 'success')
       return redirect(url_for('homepage'))

   # Return a response for non-POST requests
   return render_template('signUp.html')

@app.route('/login') # nota
def login():
   return render_template('logIn.html')

@app.route('/noteMoney') # nota
def noteT():
   return render_template('note/noteMoney.html')

@app.route('/noteM1') # nota
def noteM1():
   return render_template('note/noteM1.html')

@app.route('/noteM2') # nota
def noteM2():
   return render_template('note/noteM2.html')

@app.route('/noteM3') # nota
def noteM3():
   return render_template('note/noteM3.html')

@app.route('/noteTime') # nota
def noteM():
   return render_template('note/noteTime.html')

@app.route('/noteT1') # nota
def noteT1():
   return render_template('note/noteT1.html')

@app.route('/noteT2') # nota
def noteT2():
   return render_template('note/noteT2.html')

@app.route('/noteT3') # nota
def noteT3():
   return render_template('note/noteT3.html')

@app.route('/quizOption')
def quiz():
    return render_template('quiz/quizOption.html')

@app.route('/quizMoney')
def quizMoney():
    return render_template('quiz/quizMoney.html')

@app.route('/quizTime')
def quizTime():
    return render_template('quiz/quizTime.html')

@app.route('/quizOverall')
def quizOverall():
    return render_template('quizOverall.html')

@app.route('/profile') # nota
def profile():
   return render_template('profile.html')

@app.route('/achievement') # nota
def achievement():
   return render_template('achievement.html')

@app.route('/forum') # nota
def forum():
   return render_template('forum.html')

if __name__ == "__main__":
   with app.app_context():
       db.create_all()
   app.run(debug=True)
