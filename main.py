from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from flask_sqlalchemy import SQLAlchemy

# MySQL database configuration
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/mathlearning'

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
   return render_template('noteMoney.html')

@app.route('/noteTime') # nota
def noteM():
   return render_template('noteTime.html')

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
