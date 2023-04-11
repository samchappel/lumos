
from flask import  request, make_response, session, abort, jsonify, Flask
from flask_restful import Api, Resource
from flask_login import current_user, login_required
from werkzeug.exceptions import NotFound, Unauthorized
from models import User, UserFavorite, Location, Comment, Photo, db
from config import db, api, app, CORS, migrate, bcrypt
from enum import Enum
from datetime import datetime



class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        response = make_response(
            users,
            200
        )

        return response

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
    @login_required
    def get(self):
        favorite_list = [user_favorite.to_dict() for user_favorite in current_user.user_favorites]
        response = make_response(
            favorite_list,
            200
        )
        return response

    @login_required
    def post(self):
        data = request.get_json()
        location_id = data.get('location_id')
        if not location_id:
            return make_response({'message': 'Location ID not provided.'}, 400)

        new_favorite = UserFavorite(
            user_id=current_user.id,
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

    def delete(self, id):
        favorite = UserFavorite.query.filter_by(id=id).first()
        if not favorite:
            raise NotFound

        db.session.delete(favorite)
        db.session.commit()

        response = make_response('', 204)

        return response

api.add_resource(UserFavoritesByID, '/userfavorites/<int:id>')


class Photos(Resource):
    def get(self):
        photo_list = [photo.to_dict() for photo in Photo.query.all()]
        response = make_response(
            photo_list,
            200
        )

        return response

    def post(self):
        form_json = request.get_json()
        new_photo = Photo(
            image_url=form_json['image_url'],
            location=form_json['location'],
            city=form_json['city'],
            state=form_json['state'],
            date=form_json['date'],
            timezone=form_json['timezone']
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
    @login_required
    def patch(self, id):
        photo = Photo.query.filter_by(id=id).first()
        if not photo:
            raise NotFound

        if photo.user_id != current_user.id:
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

    @login_required
    def delete(self, id):
        photo = Photo.query.filter_by(id=id).first()
        if not photo:
            raise NotFound

        if photo.user_id != current_user.id:
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
            user_id=current_user.id,
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
        
        for attr in request.form:
            setattr(comment, attr, request.form[attr])

        db.session.add(comment)
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
        user = User.query.filter(User.email == request.get_json()['email']).first()
        session['user_id'] = user.id
        user_dict = user.to_dict()
        response = make_response(
            user_dict,
            200,
        )
        return response

api.add_resource(Login, '/login', endpoint='login')


class AuthorizedSession(Resource):
    def get(self):

        if session.get('user_id'):
            
            user = User.query.filter(User.id == session['user_id']).first()
            
            return user.to_dict(), 200
            
        else:
            raise Unauthorized


api.add_resource(AuthorizedSession, '/authorized', endpoint='authorized')


class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        response = make_response('',204,)
        return response

api.add_resource(Logout, '/logout', endpoint='logout')


@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response(
        "Not Found: Sorry the resource you are looking for does not exist",
        404
    )

    return response


if __name__ == '__main__':
    app.run(port=5000, debug=True)