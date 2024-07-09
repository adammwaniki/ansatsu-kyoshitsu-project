<<<<<<< HEAD
=======
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from config import db


# Models go here!
class Teacher(db.Model, SerializerMixin):
    __tablename__ = 'teachers'

    serialize_rules = ('-subjects',)

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), nullable = False)
    email = db.Column(db.String(255), nullable = False)
    password = db.Column(db.String(32), nullable = False)
    
    # adding relationships
    subject = db.relationship('TeacherSubject', back_populates = 'teachers', cascade= 'all, delete-orphan')
    #adding proxy
    subjects = association_proxy('teacher_subjects', 'subject')

    def __repr__(self):
        return f'<Teacher {self.name}>'

class Subject(db.Model, SerializerMixin):
    __tablename__ = 'subjects'
    serialize_rules = ('-teachers',)

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), nullable = False)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'), nullable = False)
    
    # adding relationships
    teacher = db.relationship('TeacherSubject', back_populates = 'subjects', cascade='all, delete-orphan')

    #adding proxy
    teachers = association_proxy('teacher_subjects', 'teacher')

    def __repr__(self):
        return f'<Subject {self.name}>'

class TeacherSubject(db.Model, SerializerMixin):
    __tablename__ = 'teacher_subjects'
    serialize_rules = ('-teacher.teacher_subjects', '-subject.teacher_subjects',)

    id = db.Column(db.Integer, primary_key = True)
    #topic for the subject the teacher will teach
    topic = db .Column(db.String(30), nullable = False)
    #teacher and subject
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'))
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'))
     # adding the relationships
    teacher = db.relationship('Teacher', back_populates='teacher_subjects')
    subject = db.relationship('Subject', back_populates='teacher_subjects')

    def __repr__(self):
        return f'<TeacherSubject {self.topic}>'


  
>>>>>>> 73b114d041d9055077e8f4f00242c842ac650b90
