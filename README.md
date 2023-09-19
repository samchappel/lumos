# LUMOS

It's all sun and games until you run out of light. Lumos is your go-to guide for when the sun will rise and set where it matters most, so you're never left in the dark.

## About The Project
Experience Lumos for yourself! Visit the live application <a href="https://lumos-v1.onrender.com">here</a>.

![home page](https://github.com/samchappel/lumos/blob/main/client/src/assets/lumos_home.png?raw=true)

Lumos is designed to provide users with an intuitive and comprehensive guide to discover sunrise, sunset, and golden hour times, along with other crucial info such as total hours of daylight and 12-hour hourly weather forecasts, for their favorite national parks and user-specific locations.

### Built With

* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 
* ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
* ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) 
* ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%23336791.svg?style=for-the-badge&logo=postgresql&logoColor=white)
* [![SQLAlchemy][SQLAlchemy.com]][SQLalchemy-url]
* ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) 
* [![🌼 daisyUI][daisyUI.com]][daisyUI-url]

### API's Utilized
* [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview)
* [SunriseSunset.io API](https://sunrisesunset.io/api/)
* [Suburst Quality API](https://sunsetwx.com/sunburst/)
* [National Weather Service (NWS) API](https://www.weather.gov/documentation/services-web-api)

## Installation

Clone the repository to your local machine:
```
$ git clone https://github.com/your-username/lumos.git
  ```

**Set up the React frontend:**

Navigate to the client directory:
```
$ cd client
  ```

Install the required packages and dependencies using npm:
```
$  npm install
  ```
  
**Set up the Python/Flask backend:**

In a new terminal window, navigate to the server directory:
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

For connecting the app to the external database, a .env file is required in the server directory. This file should contain the following and `your_postgres_database_url` should be replaced your actual PostgreSQL URL:
```
DATABASE_URI=your_postgres_database_url
  ```
  
Apply migrations and set up initial database schema:
```
$ flask db upgrade head
  ```

Seed the database with initial data:
```
$ python seed.py
  ```

Navigate back to the main project directory:
```
$ cd ..
  ```

Start both the backend and frontend:
```
$ honcho start
  ```

## Credentials

Your unique versions of the following Google Geocode and Sunburst Quality Prediction credentials should be stored in a ```.env``` file in the client directory. The ```.env``` file should look like this, with your credentials appended after each ```=```:

```
REACT_APP_GEOCODE_API_KEY=
REACT_APP_QUALITY_ACCESS_TOKEN=
```

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


## Contact
  
### Sam Chappel
Github: <a href="https://github.com/samchappel">samchappel</a><br>
Email: <a href="mailto:hello@samchappel.com">hello@samchappel.com</a>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[SQLAlchemy.com]: https://img.shields.io/badge/-SQLAlchemy-black?style=for-the-badge&logo=serverfault
[SQLalchemy-url]: https://www.sqlalchemy.org/
[daisyUI.com]: https://img.shields.io/badge/-🌼%20daisyUI-19d1a5?style=for-the-badge
[daisyUI-url]: https://daisyui.com/
