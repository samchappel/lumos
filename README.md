# LUMOS

It's all sun and games until you run out of light. Lumos is your go-to guide for when the sun will rise and set where it matters most, so you're never left in the dark.

## Installation

Clone the repository to your local machine:
```
  $ git clone https://github.com/your-username/lumos.git
  ```
  
Set up the Python/Flask backend:

Navigate to the server directory:
```
  $ cd server
  ```
  
Install the required packages and dependencies using Pipenv:
```
  $ pipenv install && pipenv shell
  ```
  
Set up the required environment variables in the server directory:
```
  $ export FLASK_APP=app.py
  $ export FLASK_RUN_PORT=5555
  ```
  
Run the Flask migration commands to create the database:
```
  $ flask db init
  $ flask db upgrade head
  ```

Seed the database with initial data:
```
  $ python seed.py
  ```

You can run the app and explore the APIs in the browser by using the Flask command:
```
  $ flask run --debug
  ```

Set up the React frontend:

In a new terminal window, navigate to the client directory:
```
  $ cd ../client
  ```

Install the required packages and dependencies using npm:
```
  $  npm install
  ```

Start the React frontend server:
```
  $  npm start
  ```

## Credentials

Your unique versions of the following Google Geocode and Sunburst Quality Prediction credentials should be stored in a ```.env``` file in the client directory. The ```.env``` file should look like this, with your credentials appended after each ```=```.

```
REACT_APP_GEOCODE_API_KEY=
REACT_APP_QUALITY_ACCESS_TOKEN=
```

## User Stories

As a user, I can:
- Sign in with my Google credentials
- Search for a city/state or zipcode and view dynamically updated results including sunrise, sunset, and golden hours times, total daylight hours, quality predictions, and weather updates
- View current sunrise, sunset, and golden hour times for all national parks across the country
- Favorite national park locations for at-a-glance reference
- Upload my own photos to the community gallery
- Engage with the Lumos community by liking and commenting on gallery photos
- Edit/delete resources in the gallery that only I created
- Pay for Lumos Premium tier using Stripe

## Features

- Solar Event Timings: Lumos provides accurate and up-to-date timings for sunrise, sunset, and the golden hour based on user-selected locations. This information helps users plan their activities and capture stunning moments with the best lighting conditions.
- Quality Prediction: A unique feature of Lumos is its quality prediction for upcoming sunrise or sunset times. By leveraging the power of three separate APIs, Lumos offers users reliable timing and forecasts of these awe-inspiring events.
- Weather Forecast: Lumos integrates with a dedicated weather API to provide 12-hour weather forecasts corresponding to user-selected locations. This ensures users are well-prepared and informed about the local conditions for their outdoor adventures.
- Responsive and User-Friendly: Lumos is a responsive, single-page web application with smooth navigation powered by React Router. The user interface is designed to be visually engaging and easy to navigate, enhancing the overall user experience.
- CRUD Operations and Data Validation: The application allows users to upload images and leave comments, with full CRUD (Create, Read, Update, Delete) operations supported. User inputs are validated using Formik forms, ensuring data integrity and security.
- Authentication and Resource Ownership: Lumos implements authentication, enabling users to edit and delete only the resources they created. This enhances security and ensures a personalized experience for each user.
- Efficient Data Transfer: Complex many-to-many relationships between data models are efficiently handled using SQLAlchemy and SQLAlchemy-Serializer, optimizing data transfer and retrieval.

## Motivation

Lumos was born out of a deep appreciation for the great outdoors and a desire to capture and celebrate the beauty of natural events. The project is driven by a passion for preserving the fleeting moments of sunrise, sunset, and the golden hour while inviting a community of like-minded individuals to embark on a collective journey of discovery, connection, and appreciation. But let's be honest - sunrise and sunset data is readily available just about everywhere. So what makes Lumos special? I wanted to create a platform that not only helps users track and plan their outdoor activities but also offers predictions and forecasts to enhance their experience and provides a community space to connect and share with others. Insightful quality predictions and hourly weather updates take planning a step further so Lumos users know what to expect, not just when to expect it. Lumos aims to be the go-to app for hikers, photographers, sun enthusiasts, and travelers seeking to put themselves in the way of beauty.

## Future Enhancements

- Lumos Premium features including in-app alarm scheduling and integration, offline access, and exclusive access to premium content, such as photography tutorials, articles, and tips from professional photographers, specifically related to sunrise and sunset photography
- Advanced Location Search for Premium members, including filtering by specific criteria, such as the best locations for certain types of photography or outdoor activities, and sorting by distance, popularity, or ratings 
- Mapbox integration for all user location search results

## Project Demo and Deployment
A full demo of Lumos, along with the deployed application, will be available soon. Please check back for updates!


## Author
  
### Sam Chappel
Github: <a href="https://github.com/samchappel">samchappel</a><br>
Email: <a href="mailto:hello@samchappel.com">hello@samchappel.com</a>
