
from flask import  request, make_response, session, abort, jsonify
from werkzeug.exceptions import NotFound, Unauthorized
from flask_restful import  Resource
from models import User, UserFavorite, Location, Comment, Photo
from config import db, api, app

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
    def get(self):
        favorite_list = [user_favorite.to_dict() for user_favorite in UserFavorites.query.all()]
        response = make_response(
            favorite_list,
            200
        )

        return response


    def post(self):
        data = request.get_json()
        new_favorite = UserFavorite(
            user_id=data['user_id'],
            location_id=data['location_id']
        )

        db.session.add(new_favorite)
        db.session.commit()

        response_dict = new_favorite.to_dict()

        response = make_response(
            response_dict,
            201
        )

        return response

api.add_resource(UserFavorites, '/favorites')


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

api.add_resource(UserFavoritesByID, '/favorites/<int:id>')


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