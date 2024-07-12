# ANSATSU KYOSHITSU SCHOOL (AKS)

## Description

This application's primary purpose is school management
This application will primary serve teachers, providing them with tools to manage classrooms,students,and subjects effectively

### Prerequisites
- Python 3.8 or higher installed on your computer

- You can install Python from the official Python website: ([https](https://www.python.org/downloads/))

- Vitual Studio Code installed or any other text editor

- Internet Connection

#### Installation 
-Fork and Clone the repository to your local machine
```sh
git clone https://github.com/ANSSATSU-KYOSHITSU-SCHOOL-AKS
```

-Navigate into the cloned repository

```sh
cd ANSSATSU-KYOSHITSU-SCHOOL-AKS
```
-Creating backend virtual enviroment 
To do this run the following 
`pipenv install` This installs the dependacies for the virtual enviroment

`pipenv shell` This activates the virtual enviroment

`cd server ` This moves into the backend server directory

`export FLASK_APP=app.py`

`export FLASK_RUN_PORT=5555

`flask db init`

`flask db migrate -m "migration message"

`flask db upgrade`

This creates the database and tables

`python seed.py`
This will seed the database with some dummy data

`python app.py`

Front end enviroment
`cd client`

`npm install`

`npm start `
This will start the front end server

##### Functionalities
- Signup
Teachers can sign up and this allows us to set authentications so that only teachers who are authorized can login
- Login 
Prevents unauthorized access 
- Logout
Allows user to end session 

Teachers functionalities
Users can do the following in the teachers route
- View teachers
- Search teachers 
- View teacher details eg class and subject
- Delete a teacher 
- Update a teacher

Classroom functionalities
Users can do the following in the classroom route
- View classrooms
- View Details for each classroom eg students in the class and the subjects they take

Students functionalities
Users can do the following in the students route
- View students
- Update students
- Search student by name or classroom
- Add a student
- Delete a student


## Help

* If you face any trouble, please submit a ticket on GitHub with details about what went wrong. Include all relevant error messages and screenshots.

* Feel free to ask for help! You can do so by reaching out via email([email](anastsuschool@protonmail.com))


## Authors

Contributors names and contact info

* **Adam** - ([https](https://github.com/adammwaniki))
* **Alistairs** - ([http](https://github.com/alistairs))
* **Austin** - ([https](https://github.com/austin))
* **Albert** - ([https](https://github.com/albert))
* **Nelly** - ([https](https://github.com/nelly))
