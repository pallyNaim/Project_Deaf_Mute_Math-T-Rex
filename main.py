from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Email, Length
from flask_login import login_user, LoginManager, UserMixin
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///C:/Users/USER/OneDrive/Desktop/Project_Deaf_Mute_Math/math.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.urandom(32)
app.config["DEBUG"] = True
db = SQLAlchemy(app)

# Flask-Login requires to set up a LoginManager
login_manager = LoginManager()
login_manager.init_app(app)


# User model should inherit from UserMixin
class User(UserMixin, db.Model):
        id = db.Column(db.Integer, primary_key=True)
        username = db.Column(db.String(64), unique=True, nullable=False)
        email = db.Column(db.String(120), unique=True, nullable=False)
        password = db.Column(db.String(128), nullable=False)
        user_type = db.Column(db.String(64), nullable=False)


with app.app_context():
    # Database Initialization
    try:
        db.drop_all()
        db.create_all()
    except Exception as e:
        print(f"Database initialization error: {e}")


class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired(), Length(min=4, max=15)])
    email = StringField('Email', validators=[InputRequired(), Email(message='Invalid email'), Length(max=50)])
    password = PasswordField('Password', validators=[InputRequired(), Length(min=8, max=80)])

@app.route('/')  # Homepage
def diveIn():
    return render_template('diveIn.html')

@app.route('/homepage')  # Homepage
def homepage():
    return render_template('index.html')


@app.route('/gameTime')  # Homepage
def gameTime():
    return render_template('clockgame.html')


@app.route('/gameMoney')  # Homepage
def gameMoney():
    return render_template('moneyGame.html')


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form.get('Username')
        email = request.form.get('Email')
        password = request.form.get('Password')
        user_type = request.form.get('User')

        # Check if username or email already exists
        existing_user = User.query.filter_by(username=username).first()
        existing_email = User.query.filter_by(email=email).first()

        if existing_user:
            flash('Username already exists', 'error')
        elif existing_email:
            flash('Email already exists', 'error')
        else:
            new_user = User(username=username, password=password, user_type=user_type, email=email)

            try:
                db.session.add(new_user)
                db.session.commit()
                flash('Registration successful!', 'success')
                return redirect(url_for('homepage'))
            except Exception as e:
                print(e)
                db.session.rollback()
                flash('An error occurred. Please try again.', 'error')

    return render_template('signUp.html')


# This callback is used to reload the user object from the user ID stored in the session
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('Username')
        password = request.form.get('Password')

        user = User.query.filter_by(username=username).first()

        # if a user is found and password is correct
        if user and user.password == password:
            login_user(user)
            flash('Login successful!', 'success')
            return redirect(url_for('homepage'))
        else:
            flash('Invalid username or password', 'error')
            return render_template('logIn.html')

    return render_template('logIn.html')


@app.route('/noteMoney')  # nota
def noteT():
    return render_template('note/noteMoney.html')


@app.route('/noteM1')  # nota
def noteM1():
    return render_template('note/noteM1.html')


@app.route('/noteM2')  # nota
def noteM2():
    return render_template('note/noteM2.html')


@app.route('/noteM3')  # nota
def noteM3():
    return render_template('note/noteM3.html')


@app.route('/noteTime')  # nota
def noteM():
    return render_template('note/noteTime.html')


@app.route('/noteT1')  # nota
def noteT1():
    return render_template('note/noteT1.html')


@app.route('/noteT2')  # nota
def noteT2():
    return render_template('note/noteT2.html')


@app.route('/noteT3')  # nota
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


@app.route('/profile')  # nota
def profile():
    return render_template('profile.html')


@app.route('/achievement')  # nota
def achievement():
    return render_template('achievement.html')


@app.route('/forum')  # nota
def forum():
    return render_template('forum.html')


if __name__ == "__main__":
    app.run(debug=True)
