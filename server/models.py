from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from sqlalchemy import CheckConstraint, Date, Enum
from flask_login import LoginManager
from enum import Enum as PyEnum
import re

from config import bcrypt, db

from datetime import datetime

date_str = '2023-04-17'
date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)
    admin = db.Column(db.String, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_favorites = db.relationship('UserFavorite', back_populates='user')
    photos = db.relationship('Photo', back_populates='user', cascade='all, delete-orphan')
    comments = db.relationship('Comment', back_populates='user', cascade='all, delete-orphan')
    likes = db.relationship('Like', back_populates='user')

    serialize_rules = ('-user_favorites', '-photos', '-comments', '-likes')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    @validates('email')
    def validate_email(self, key, email):
        users = User.query.all()
        emails = [user.email for user in users]
        if not email:
            raise ValueError('Email must be provided')
        elif email in emails:
            raise ValueError('This email is already registered to an account - please log in.')
        elif not re.search('@', email):
            raise ValueError('Must be a valid email')
        return email

    @validates('password')
    def validate_password(self, key, password):
        if len(password) < 8:
            raise ValueError('Password must be at least 8 characters long.')
        elif not re.search('[!@#$%^&*]', password):
            raise ValueError('Password must contain at least one special character.')
        return password
        
    @validates('first_name')
    def validate_first_name(self, key, value):
        if not value:
            raise ValueError('First name must be provided')
        return value
    

    def __repr__(self):
        return f'USER: ID: {self.id}, Name {self.name}, Email: {self.email}, Admin: {self.admin}'

# class Tmz(PyEnum):
#     EST = 'est'
#     CST = 'cst'
#     MST = 'mst'
#     PST = 'pst'
#     AKST = 'akst'
#     SST = 'sst'

class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String)
    name = db.Column(db.String)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    # timezone = db.Column(Enum(Tmz), default=Tmz.EST)
    city = db.Column(db.String)
    state = db.Column(db.String)
    park_type = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_favorites = db.relationship('UserFavorite', back_populates='location')

    serialize_rules = ('-user_favorites',)


class UserFavorite(db.Model, SerializerMixin):
    __tablename__ = 'userfavorites'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user = db.relationship('User', back_populates='user_favorites')
    location = db.relationship('Location', back_populates='user_favorites')

    serialize_rules = ('-user', '-location')


class Photo(db.Model, SerializerMixin):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    image = db.Column(db.String)
    location = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    caption = db.Column(db.String)
    date = db.Column(Date)
    # timezone = db.Column(Enum(Tmz), default=Tmz.EST)

    user = db.relationship('User', back_populates='photos')
    comments = db.relationship('Comment', back_populates='photos', cascade='all, delete-orphan')
    likes = db.relationship('Like', back_populates='photo')

    serialize_rules = ('-user', '-comments', '-likes')


class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    photo_id = db.Column(db.Integer, db.ForeignKey('photos.id'))
    comment = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user = db.relationship('User', back_populates='comments')
    photos = db.relationship('Photo', back_populates='comments')

    serialize_rules = ('-photos',)

class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    photo_id = db.Column(db.Integer, db.ForeignKey('photos.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship('User', back_populates='likes')
    photo = db.relationship('Photo', back_populates='likes')

    serialize_rules = ('-user', '-photo')


