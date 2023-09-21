from flask import  request, make_response, session, abort, jsonify, Flask, send_from_directory
from flask_restful import Api, Resource
from flask_login import current_user, login_required
from flask_sqlalchemy import SQLAlchemy
from werkzeug.exceptions import NotFound, Unauthorized
from models import User, UserFavorite, Location, Comment, Like, Photo, db
from enum import Enum
from datetime import datetime
from werkzeug.utils import secure_filename
import cloudinary.uploader
import os

from flask_login import LoginManager

from config import app, api, db, migrate, bcrypt, CORS, login_manager, load_user

login_manager.init_app(app)

current_directory = os.path.dirname(os.path.abspath(__file__))
build_directory = os.path.join(current_directory, '..', 'client', 'build')


class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        response = make_response(
            users,
            200
        )

        return response

    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        first_name = data.get('first_name')
        last_name = data.get('last_name')

        if User.query.filter_by(email=email).first():
            return {'error': 'Email already in use'}, 409

        new_user = User(email=email, password=password, first_name=first_name, last_name=last_name)

        db.session.add(new_user)
        db.session.commit()

        return new_user.to_dict(), 201
    

api.add_resource(Users, '/users')


class Locations(Resource):
    def get(self):
        location_list = [location.to_dict() for location in Location.query.all()]
        response = make_response(
            location_list,
            200
        )

        return response

api.add_resource(Locations, '/locations')


class LocationByID(Resource):
    def get(self, id):
        location = Location.query.filter_by(id=id).first()
        if not location:
            raise NotFound
        location_dict = location.to_dict()
        response = make_response(
            location_dict,
            200
        )

        return response

api.add_resource(LocationByID, '/locations/<int:id>')


class UserFavorites(Resource):
    def get(self):
        user_id = session['user_id']
        user = User.query.get(user_id)

        if user is None:
            return make_response({'message': 'User not found.'}, 404)

        favorite_list = []

        for user_favorite in user.user_favorites:
            favorite_dict = user_favorite.to_dict()
            favorite_dict['location'] = user_favorite.location.to_dict()
            favorite_dict['is_favorite'] = True
            favorite_list.append(favorite_dict)
        
        response = make_response(favorite_list, 200)
        return response

    def post(self):
        data = request.get_json()
        location_id = data.get('location_id')
        if not location_id:
            return make_response({'message': 'Location ID not provided.'}, 400)

        new_favorite = UserFavorite(
            user_id=session['user_id'],
            location_id=location_id
        )

        db.session.add(new_favorite)
        db.session.commit()

        response_dict = new_favorite.to_dict()

        response = make_response(
            response_dict,
            201
        )

        return response

api.add_resource(UserFavorites, '/userfavorites')

class CheckFavoriteStatus(Resource):
    def get(self):
        user_id = session['user_id']
        location_id = request.args.get('location_id')

        favorite = UserFavorite.query.filter_by(user_id=user_id, location_id=location_id).first()

        if favorite:
            return {'is_favorite': True}, 200
        else:
            return {'is_favorite': False}, 200

api.add_resource(CheckFavoriteStatus, '/userfavorites/check', endpoint='userfavorites_check')

class ToggleFavoriteStatus(Resource):
    def get(self):
        user_id = session['user_id']
        location_id = request.args.get('location_id')

        favorite = UserFavorite.query.filter_by(user_id=user_id, location_id=location_id).first()

        if favorite:
            db.session.delete(favorite)
            is_favorite = False
        else:
            new_favorite = UserFavorite(
                user_id=user_id,
                location_id=location_id
            )
            db.session.add(new_favorite)
            is_favorite = True

        db.session.commit()

        return {'is_favorite': is_favorite}, 200

    def post(self):
        data = request.get_json()
        location_id = data.get('location_id')
        if not location_id:
            return make_response({'message': 'Location ID not provided.'}, 400)

        new_favorite = UserFavorite(
            user_id=session['user_id'],
            location_id=location_id
        )

        db.session.add(new_favorite)
        db.session.commit()

        response_dict = new_favorite.to_dict()

        response = make_response(
            response_dict,
            201
        )

        return response

api.add_resource(ToggleFavoriteStatus, '/userfavorites/toggle', endpoint='userfavorites_toggle')


class UserFavoritesByID(Resource):
    def get(self, id):
        favorite = UserFavorite.query.filter_by(id=id).first()
        if not favorite:
            raise NotFound
        favorite_dict = favorite.to_dict()
        response = make_response(
            favorite_dict,
            200
        )

        return response

        def post(self, id):
            favorite = UserFavorite.query.filter_by(id=id).first()
            if favorite:
                raise Conflict

            new_favorite = UserFavorite(
                user_id=session['user_id'],
                location_id=id
            )

            db.session.add(new_favorite)
            db.session.commit()

            response_dict = new_favorite.to_dict()

            response = make_response(
                response_dict,
                201
            )

            return response

    def delete(self, id):
        favorite = UserFavorite.query.filter_by(id=id).first()
        if not favorite:
            raise NotFound

        db.session.delete(favorite)
        db.session.commit()

        response = make_response('', 204)

        return response

api.add_resource(UserFavoritesByID, '/userfavorites/<int:id>')

class UserFavoritesDelete(Resource):
    def delete(self):
        user_id = session['user_id']

        if user_id is None:
            return make_response({'message': 'User not found.'}, 404)

        favorites = UserFavorite.query.filter_by(user_id=user_id).all()
        for favorite in favorites:
            db.session.delete(favorite)
        db.session.commit()

        response = make_response('', 204)
        return response

api.add_resource(UserFavoritesDelete, '/userfavorites/delete')

class Photos(Resource):
    def get(self):
        photo_list = [photo.to_dict() for photo in Photo.query.all()]
        response = make_response(
            photo_list,
            200
        )

        return response
        
    @staticmethod
    def ensure_https(photo):
        if photo.image and photo.image.startswith('http://res.cloudinary.com'):
            photo.image = photo.image.replace('http://', 'https://')
        return photo

    def post(self):
        image = request.files.get('image')
        if not image:
            return make_response({'message': 'No file or unsupported file type'}, 400)

        upload_result = cloudinary.uploader.upload(image, format="jpg", secure=True)
        image_url = upload_result["url"]

        form_data = request.form
        date_str = request.form.get('date')
        date = datetime.strptime(date_str, '%Y-%m-%d').date()
        new_photo = Photo(
            image=image_url,
            location=form_data['location'],
            city=form_data['city'],
            state=form_data['state'],
            caption=form_data['caption'],
            date=date,
            user_id=session['user_id']
        )

        db.session.add(new_photo)
        db.session.commit()

        response_dict = new_photo.to_dict()

        response = make_response(
            response_dict,
            201
        )

        return response

api.add_resource(Photos, '/photos')


class PhotoByID(Resource):
    def get(self, id):
        photo = Photo.query.filter_by(id=id).first()
        if not photo:
            raise NotFound

        photo_dict = photo.to_dict()

        response = make_response(
            photo_dict,
            200
        )

        return response

        
    @login_required
    def patch(self, id):
        photo = Photo.query.filter_by(id=id).first()
        if not photo:
            raise NotFound

        if photo.user_id != session['user_id']:
            return make_response({'message': 'You are not authorized to update this photo.'}, 401)

        for attr in request.form:
            setattr(photo, attr, request.form[attr])

        db.session.add(photo)
        db.session.commit()

        photo_dict = photo.to_dict()

        response = make_response(
            photo_dict,
            200
        )

        return response

    def delete(self, id):
        photo = Photo.query.filter_by(id=id).first()
        if not photo:
            raise NotFound

        if photo.user_id != session['user_id']:
            return make_response({'message': 'You are not authorized to delete this photo.'}, 401)

        db.session.delete(photo)
        db.session.commit()

        response = make_response('', 204)

        return response

api.add_resource(PhotoByID, '/photos/<int:id>')


class Comments(Resource):
    def get(self, photo_id):
        comment_list = [comment.to_dict() for comment in Comment.query.filter_by(photo_id=photo_id).all()]
        response = make_response(
            comment_list,
            200
        )

        return response

    def post(self, photo_id):
        form_json = request.get_json()
        new_comment = Comment(
            comment=form_json['comment'],
            user_id=session['user_id'],
            photo_id=photo_id,
            created_at=datetime.utcnow()
        )

        db.session.add(new_comment)
        db.session.commit()

        response_dict = new_comment.to_dict()
        response = make_response(
            response_dict,
            201
        )
        return response

api.add_resource(Comments, '/photos/<int:photo_id>/comments')


class CommentByID(Resource):
    def patch(self, id):
        comment = Comment.query.filter_by(id=id).first()
        if not comment:
            raise NotFound
        
        form_json = request.get_json()
        comment.comment = form_json['comment']

        db.session.commit()

        comment_dict = comment.to_dict()

        response = make_response(
            comment_dict,
            200
        )

        return response

    def delete(self, id):
        comment = Comment.query.filter_by(id=id).first()
        if not comment:
            raise NotFound
        db.session.delete(comment)
        db.session.commit()

        response = make_response('', 204)

        return response

api.add_resource(CommentByID, '/comments/<int:id>')

class Likes(Resource):
    def get(self, photo_id):
        likes = Like.query.filter_by(photo_id=photo_id).all()
        likes_count = len(likes)
        return {"likes_count": likes_count}, 200
        
    def post(self):
        form_json = request.get_json()
        new_like = Like(
            user_id=form_json['user_id'],
            photo_id=form_json['photo_id'],
            created_at=datetime.utcnow()
        )

        db.session.add(new_like)
        db.session.commit()

        response_dict = new_like.to_dict()
        response = make_response(
            response_dict,
            201
        )
        return response

api.add_resource(Likes, '/likes/<int:photo_id>')


class Signup(Resource):
     def post(self):
        
        first_name = request.get_json()['first_name']
        last_name = request.get_json()['last_name']
        email = request.get_json()['email']
        password = request.get_json()['password']

        new_user = User(first_name=first_name, last_name=last_name, email=email, admin=False)
        new_user.password_hash = password
        db.session.add(new_user)
        db.session.commit()

        session['user_id'] = new_user.id
                
        return new_user.to_dict(), 201

api.add_resource(Signup, '/signup', endpoint='signup')


class Login(Resource):
    def post(self):
        try:
            user = User.query.filter_by(email=request.get_json()['email']).first()
            if user.authenticate(request.get_json()['password']):
                session['user_id'] = user.id
                print(session)
                response = make_response(
                    user.to_dict(),
                    200
                )
                return response
        except:
            abort(401, "Incorrect Email or Password")

api.add_resource(Login, '/login')


class AuthorizedSession(Resource):
    def get(self):
        try:
            user = User.query.filter_by(id=session['user_id']).first()
            response = make_response(
                user.to_dict(),
        
                200
            )
            return response
        except:
            abort(401, "Unauthorized")

api.add_resource(AuthorizedSession, '/authorized')


class Logout(Resource):
    def delete(self):
        # session['user_id'] = None
        session.pop('user_id', None)
        print(session)
        response = make_response('',204,)
        return response

api.add_resource(Logout, '/logout', endpoint='logout')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(build_directory, path)):
        return send_from_directory(build_directory, path)
    else:
        return send_from_directory(build_directory, 'index.html')


@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response(
        "Not Found: Sorry the resource you are looking for does not exist",
        404
    )

    return response


if __name__ == '__main__':
    app.run(port=8000, debug=True)