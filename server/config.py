from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_login import LoginManager
# from models import User
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__, static_folder='uploads')

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://samanthachappel:@localhost/lumos_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = 'BAD_SECRET_KEY'

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

db = SQLAlchemy(metadata=metadata)
db.init_app(app)

CORS(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)


api = Api(app)