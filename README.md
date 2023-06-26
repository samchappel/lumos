# LUMOS

It's all sun and games until you run out of light. Lumos is your go-to guide for when the sun will rise and set where it matters most, so you're never left in the dark.

Welcome to Lumos, the app that sheds light on the world around you! Lumos is my capstone project for Flatiron's Live Software Engineer program. This full-stack application integrates a React.js frontend with a Python/Flask backend and is designed to provide users with an intuitive and comprehensive guide to discover the sunrise, sunset, and other crucial timings such as the golden hour and total daylight duration for their favorite national parks and user-specific locations. These insights, tied to user search results, offer a comprehensive overview of their chosen location's daily natural rhythms. A unique feature I've incorporated is a quality prediction for upcoming sunrise or sunset times, which harnesses the power of three separate APIs to offer users reliable timing and forecasts of these awe-inspiring events, so they never miss the perfect sunrise.

As a secondary feature, Lumos also taps into a dedicated weather API. This allows it to provide current weather and a 12-hour weather forecast corresponding to user search results, ensuring users are well-prepared and informed about the local conditions of their selected locations. Together, these features create a robust and holistic user experience, making Lumos a go-to app for natural event tracking - perfect for hikers, photographers, sun enthusiasts, or anyone traveling who just wants to catch a glimpse of that colorful magic.

## Features

- Solar Event Timings: Lumos provides accurate and up-to-date timings for sunrise, sunset, and the golden hour based on user-selected locations. This information helps users plan their activities and capture stunning moments with the best lighting conditions.
- Quality Prediction: A unique feature of Lumos is its quality prediction for upcoming sunrise or sunset times. By leveraging the power of three separate APIs, Lumos offers users reliable timing and forecasts of these awe-inspiring events.
- Weather Forecast: Lumos integrates with a dedicated weather API to provide 12-hour weather forecasts corresponding to user-selected locations. This ensures users are well-prepared and informed about the local conditions for their outdoor adventures.
- Responsive and User-Friendly: Lumos is a responsive, single-page web application with smooth navigation powered by React Router. The user interface is designed to be visually engaging and easy to navigate, enhancing the overall user experience.
- CRUD Operations and Data Validation: The application allows users to upload images and leave comments, with full CRUD (Create, Read, Update, Delete) operations supported. User inputs are validated using Formik forms, ensuring data integrity and security.
- Authentication and Resource Ownership: Lumos implements authentication, enabling users to edit and delete only the resources they created. This enhances security and ensures a personalized experience for each user.
- Efficient Data Transfer: Complex many-to-many relationships between data models are efficiently handled using SQLAlchemy and SQLAlchemy-Serializer, optimizing data transfer and retrieval.

## Motivation

Lumos was born out of a deep appreciation for the great outdoors and a desire to capture and celebrate the beauty of natural events. The project is driven by a passion for preserving the fleeting moments of sunrise, sunset, and the golden hour while inviting a community of like-minded individuals to embark on a collective journey of discovery, connection, and appreciation. I wanted to create a platform that not only helps users track and plan their outdoor activities but also offers insights and predictions to enhance their experience and provides a community space to connect and share with others. Lumos aims to be the go-to app for hikers, photographers, sun enthusiasts, and travelers seeking to put themselves in the way of beauty.

## Project Demo and Deployment
A full demo of Lumos, along with the deployed application, will be available soon. Please check back for updates!

## Installation

To get started with Lumos, follow the instructions below:

Clone the repository to your local machine:
```
  $ git clone https://github.com/your-username/lumos.git
  ```
  
Navigate to the project directory:
```
  $ cd lumos
  ```
  
Set up the backend:

Navigate to the server directory:
```
  $ cd server
  ```
  
Install the required packages and dependencies using Pipenv:
```
  $ pipenv install && pipenv shell
  ```
  
Set up the environment variables in the server directory:
```
  $ export FLASK_APP=app.py
  $ export FLASK_RUN_PORT=5555
  ```
  
Run the Flask migration commands to create the database:
```
  $ flask db init
  $ flask db upgrade head
  ```  
  
If you need to update your models, run the following command to generate a migration:
```
  $ flask db revision --autogenerate -m 'Your migration message'
  ```

Apply the migration to update the database file:
```
  $ flask db upgrade head
  ```

Seed the database with initial data:
```
  $ python seed.py
  ```

You can run the app and explore the APIs in the browser by using Flask command:
```
  $ flask run --debug
  ```

Set up the frontend:

Navigate to the client directory:
```
  $ cd ../client
  ```

Install the required packages and dependencies using npm:
```
  $  npm install
  ```

Start the frontend server:
```
  $  npm start
  ```



## Contributors
  
### Sam Chappel
Github: <a href="https://github.com/samchappel">samchappel</a><br>
Email: <a href="mailto:hello@samchappel.com">hello@samchappel.com</a>
