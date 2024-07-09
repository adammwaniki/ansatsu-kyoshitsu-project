from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from config import db

#Models go here!
class Teacher(db.Model, SerializerMixin):
    tablename = 'teachers'

id = db.Column(db.Integer, primary_key = True)
name = db.Column(db.String(120), nullable = False)
email = db.Column(db.String(255), unique = True, nullable = False)
password = db.Column(db.String(32), nullable = False)

# adding foreign keys for the classrooms
classroom_id = db.Column(db.Integer, db.ForeignKey('classrooms.id'))

# adding relationships
subject = db.relationship('TeacherSubject', back_populates = 'teachers', cascade='all, delete-orphan')
subjects = association_proxy('teacher_subjects', 'subject')

# adding serialization rules

serialize_rules = ('-subjects',)

# Add validators 
@validates('email')
def validate_email(self, key, email):
    if '@' or '.' not in email:
        raise AssertionError('Email must contain @ and . ')
    if not email or Teacher.query.filter(Teacher.email == email).first():
        raise ValueError("Email must be a unique, non-empty string")
    return email

@validates('password')
def validates_password(self, key, password):
    if len(password) < 6:
        raise ValueError("Password should be more than 6 characters ")
    return password


def __repr__(self):
    return f'<Teacher(id={self.id}, name={self.name})>'
class Subject(db.Model, SerializerMixin):
    tablename = 'subjects'

id = db.Column(db.Integer, primary_key = True)
name = db.Column(db.String(120), nullable = False)
teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'), nullable = False)

# adding relationships
teacher_subjects = db.relationship('TeacherSubject', back_populates = 'teachers', cascade='all, delete-orphan')
subjects = association_proxy('teacher_subjects', 'subject')

# adding serialization rules
serialize_rules = ('-teachers',)

def __repr__(self):
    return f'<Subject {self.name}>'
class TeacherSubject(db.Model, SerializerMixin):
    tablename = 'teacher_subjects'

id = db.Column(db.Integer, primary_key=True)
topic = db.Column(db.String(30), nullable=False)

# adding foreign keys for the relationships
teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'))
subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'))

# adding the relationships
teacher = db.relationship('Teacher', back_populates='teacher_subjects')
subject = db.relationship('Subject', back_populates='teacher_subjects')

# add serialization rules
serialize_rules = ('-teacher.teacher_subjects', '-subject.teacher_subjects',)

def __repr__(self):
    return f'<TeacherSubject {self.topic}>'
class Student(db.Model, SerializerMixin):
    tablename = 'students'

id = db.Column(db.Integer, primary_key = True)
name = db.Column(db.String(120), nullable = False)
# adding foreign keys for the classrooms
classroom_id = db.Column(db.Integer, db.ForeignKey('classrooms.id'))



# adding relationships
student_subjects = db.relationship('StudentSubject', back_populates = 'students', cascade='all, delete-orphan')
subjects = association_proxy('student_subjects', 'subject')

# adding serialization rules
serialize_rules = ('-subjects',)

def __repr__(self):
    return f'<Student {self.name}>'
class StudentSubject(db.Model, SerializerMixin):
    tablename = 'student_subjects'

id = db.Column(db.Integer, primary_key=True)
topic = db.Column(db.String(30), nullable=False)

# adding foreign keys for the relationships
student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'))

# adding the relationships
student = db.relationship('Student', back_populates='student_subjects')
subject = db.relationship('Subject', back_populates='student_subjects')

# add serialization rules
serialize_rules = ('-student.student_subjects', '-subject.student_subjects',)

def __repr__(self):
    return f'<StudentSubject {self.topic}>'
class Classroom(db.Model, SerializerMixin):
    tablename = 'classrooms'

id = db.Column(db.Integer, primary_key = True)
name = db.Column(db.String(30), nullable = False, unique = True)

def __repr__(self):
    return f'<StudentSubject {self.topic}>'