#!/usr/bin/env python3
# /server/app.py

# Remote library imports
from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify
from flask_restful import Api, Resource
import os

# Local imports
from config import app, db, api
from models import Teacher, Subject, TeacherSubject, Student, StudentSubject, Classroom

# Views go here!
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

# Teacher resource
class Teachers(Resource):
    def get(self):
        response_dict_list = [teacher.to_dict() for teacher in Teacher.query.all()]
        response = make_response(jsonify(response_dict_list), 200)
        return response

    def post(self):
        data = request.get_json()
        new_teacher = Teacher(
            name=data['name'],
            email=data['email'],
            password=data['password'],
            classroom_id=data['classroom_id']
        )
        db.session.add(new_teacher)
        db.session.commit()
        response = make_response(jsonify(new_teacher.to_dict()), 201)
        return response

api.add_resource(Teachers, '/teachers')

class TeachersByID(Resource):
    def get(self, id):
        teacher_specific = Teacher.query.filter_by(id=id).first()
        if teacher_specific:
            response_dict = teacher_specific.to_dict()
            response = make_response(jsonify(response_dict), 200)
        else:
            response = make_response(jsonify({"message": "Teacher not found"}), 404)
        return response

    def patch(self, id):
        teacher_specific = Teacher.query.filter_by(id=id).first()
        if teacher_specific:
            data = request.get_json()
            for key, value in data.items():
                setattr(teacher_specific, key, value)
            db.session.commit()
            response = make_response(jsonify(teacher_specific.to_dict()), 200)
        else:
            response = make_response(jsonify({"message": "Teacher not found"}), 404)
        return response

    def delete(self, id):
        teacher_specific = Teacher.query.filter_by(id=id).first()
        if teacher_specific:
            db.session.delete(teacher_specific)
            db.session.commit()
            response = make_response({}, 204)
        else:
            response = make_response(jsonify({"message": "Teacher not found"}), 404)
        return response

api.add_resource(TeachersByID, '/teachers/<int:id>')

# Subject resource
class Subjects(Resource):
    def get(self):
        response_dict_list = [subject.to_dict() for subject in Subject.query.all()]
        response = make_response(jsonify(response_dict_list), 200)
        return response

    def post(self):
        data = request.get_json()
        new_subject = Subject(name=data['name'])
        db.session.add(new_subject)
        db.session.commit()
        response = make_response(jsonify(new_subject.to_dict()), 201)
        return response

api.add_resource(Subjects, '/subjects')

class SubjectsByID(Resource):
    def get(self, id):
        subject_specific = Subject.query.filter_by(id=id).first()
        if subject_specific:
            response_dict = subject_specific.to_dict()
            response = make_response(jsonify(response_dict), 200)
        else:
            response = make_response(jsonify({"message": "Subject not found"}), 404)
        return response

    def patch(self, id):
        subject_specific = Subject.query.filter_by(id=id).first()
        if subject_specific:
            data = request.get_json()
            for key, value in data.items():
                setattr(subject_specific, key, value)
            db.session.commit()
            response = make_response(jsonify(subject_specific.to_dict()), 200)
        else:
            response = make_response(jsonify({"message": "Subject not found"}), 404)
        return response

    def delete(self, id):
        subject_specific = Subject.query.filter_by(id=id).first()
        if subject_specific:
            db.session.delete(subject_specific)
            db.session.commit()
            response = make_response({}, 204)
        else:
            response = make_response(jsonify({"message": "Subject not found"}), 404)
        return response

api.add_resource(SubjectsByID, '/subjects/<int:id>')

# TeacherSubject resource
class TeacherSubjects(Resource):
    def get(self):
        response_dict_list = [teacher_subject.to_dict() for teacher_subject in TeacherSubject.query.all()]
        response = make_response(jsonify(response_dict_list), 200)
        return response

    def post(self):
        data = request.get_json()
        new_teacher_subject = TeacherSubject(
            topic=data['topic'],
            teacher_id=data['teacher_id'],
            subject_id=data['subject_id']
        )
        db.session.add(new_teacher_subject)
        db.session.commit()
        response = make_response(jsonify(new_teacher_subject.to_dict()), 201)
        return response

api.add_resource(TeacherSubjects, '/teacher_subjects')

class TeacherSubjectsByID(Resource):
    def get(self, id):
        teacher_subject_specific = TeacherSubject.query.filter_by(id=id).first()
        if teacher_subject_specific:
            response_dict = teacher_subject_specific.to_dict()
            response = make_response(jsonify(response_dict), 200)
        else:
            response = make_response(jsonify({"message": "TeacherSubject not found"}), 404)
        return response

    def patch(self, id):
        teacher_subject_specific = TeacherSubject.query.filter_by(id=id).first()
        if teacher_subject_specific:
            data = request.get_json()
            for key, value in data.items():
                setattr(teacher_subject_specific, key, value)
            db.session.commit()
            response = make_response(jsonify(teacher_subject_specific.to_dict()), 200)
        else:
            response = make_response(jsonify({"message": "TeacherSubject not found"}), 404)
        return response

    def delete(self, id):
        teacher_subject_specific = TeacherSubject.query.filter_by(id=id).first()
        if teacher_subject_specific:
            db.session.delete(teacher_subject_specific)
            db.session.commit()
            response = make_response({}, 204)
        else:
            response = make_response(jsonify({"message": "TeacherSubject not found"}), 404)
        return response

api.add_resource(TeacherSubjectsByID, '/teacher_subjects/<int:id>')

# Student resource
class Students(Resource):
    def get(self):
        response_dict_list = [student.to_dict() for student in Student.query.all()]
        response = make_response(jsonify(response_dict_list), 200)
        return response

    def post(self):
        data = request.get_json()
        new_student = Student(
            name=data['name'],
            classroom_id=data['classroom_id']
        )
        db.session.add(new_student)
        db.session.commit()
        response = make_response(jsonify(new_student.to_dict()), 201)
        return response

api.add_resource(Students, '/students')

class StudentsByID(Resource):
    def get(self, id):
        student_specific = Student.query.filter_by(id=id).first()
        if student_specific:
            response_dict = student_specific.to_dict()
            response = make_response(jsonify(response_dict), 200)
        else:
            response = make_response(jsonify({"message": "Student not found"}), 404)
        return response

    def patch(self, id):
        student_specific = Student.query.filter_by(id=id).first()
        if student_specific:
            data = request.get_json()
            for key, value in data.items():
                setattr(student_specific, key, value)
            db.session.commit()
            response = make_response(jsonify(student_specific.to_dict()), 200)
        else:
            response = make_response(jsonify({"message": "Student not found"}), 404)
        return response

    def delete(self, id):
        student_specific = Student.query.filter_by(id=id).first()
        if student_specific:
            db.session.delete(student_specific)
            db.session.commit()
            response = make_response({}, 204)
        else:
            response = make_response(jsonify({"message": "Student not found"}), 404)
        return response

api.add_resource(StudentsByID, '/students/<int:id>')

# StudentSubject resource
class StudentSubjects(Resource):
    def get(self):
        response_dict_list = [student_subject.to_dict() for student_subject in StudentSubject.query.all()]
        response = make_response(jsonify(response_dict_list), 200)
        return response

    def post(self):
        data = request.get_json()
        new_student_subject = StudentSubject(
            topic=data['topic'],
            student_id=data['student_id'],
            subject_id=data['subject_id']
        )
        db.session.add(new_student_subject)
        db.session.commit()
        response = make_response(jsonify(new_student_subject.to_dict()), 201)
        return response

api.add_resource(StudentSubjects, '/student_subjects')

class StudentSubjectsByID(Resource):
    def get(self, id):
        student_subject_specific = StudentSubject.query.filter_by(id=id).first()
        if student_subject_specific:
            response_dict = student_subject_specific.to_dict()
            response = make_response(jsonify(response_dict), 200)
        else:
            response = make_response(jsonify({"message": "StudentSubject not found"}), 404)
        return response

    def patch(self, id):
        student_subject_specific = StudentSubject.query.filter_by(id=id).first()
        if student_subject_specific:
            data = request.get_json()
            for key, value in data.items():
                setattr(student_subject_specific, key, value)
            db.session.commit()
            response = make_response(jsonify(student_subject_specific.to_dict()), 200)
        else:
            response = make_response(jsonify({"message": "StudentSubject not found"}), 404)
        return response

    def delete(self, id):
        student_subject_specific = StudentSubject.query.filter_by(id=id).first()
        if student_subject_specific:
            db.session.delete(student_subject_specific)
            db.session.commit()
            response = make_response({}, 204)
        else:
            response = make_response(jsonify({"message": "StudentSubject not found"}), 404)
        return response

api.add_resource(StudentSubjectsByID, '/student_subjects/<int:id>')

# Classroom resource
class Classrooms(Resource):
    def get(self):
        response_dict_list = [classroom.to_dict() for classroom in Classroom.query.all()]
        response = make_response(jsonify(response_dict_list), 200)
        return response

    def post(self):
        data = request.get_json()
        new_classroom = Classroom(
            name=data['name'],
            teacher_id=data['teacher_id']
        )
        db.session.add(new_classroom)
        db.session.commit()
        response = make_response(jsonify(new_classroom.to_dict()), 201)
        return response

api.add_resource(Classrooms, '/classrooms')

class ClassroomsByID(Resource):
    def get(self, id):
        classroom_specific = Classroom.query.filter_by(id=id).first()
        if classroom_specific:
            response_dict = classroom_specific.to_dict()
            response = make_response(jsonify(response_dict), 200)
        else:
            response = make_response(jsonify({"message": "Classroom not found"}), 404)
        return response

    def patch(self, id):
        classroom_specific = Classroom.query.filter_by(id=id).first()
        if classroom_specific:
            data = request.get_json()
            for key, value in data.items():
                setattr(classroom_specific, key, value)
            db.session.commit()
            response = make_response(jsonify(classroom_specific.to_dict()), 200)
        else:
            response = make_response(jsonify({"message": "Classroom not found"}), 404)
        return response

    def delete(self, id):
        classroom_specific = Classroom.query.filter_by(id=id).first()
        if classroom_specific:
            db.session.delete(classroom_specific)
            db.session.commit()
            response = make_response({}, 204)
        else:
            response = make_response(jsonify({"message": "Classroom not found"}), 404)
        return response

api.add_resource(ClassroomsByID, '/classrooms/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
