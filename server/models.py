# /server/models.py

from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from config import db


# Teacher model
class Teacher(db.Model, SerializerMixin):
    __tablename__ = 'teachers'

    id = db.Column(db.Integer, primary_key=True)  # Primary key
    name = db.Column(db.String(120), nullable=False)  # Teacher's name
    email = db.Column(db.String(255), unique=True, nullable=False)  # Teacher's unique email
    password = db.Column(db.String(32), nullable=False)  # Teacher's password
    classroom_id = db.Column(db.Integer, db.ForeignKey('classrooms.id'))  # Foreign key to Classroom

    # Relationship with TeacherSubject
    teacher_subjects = db.relationship('TeacherSubject', back_populates='teacher', cascade='all, delete-orphan')
    # Association proxy to subjects through teacher_subjects
    subjects = association_proxy('teacher_subjects', 'subject')

    serialize_rules = ('-subjects.teacher', '-teacher_subjects.teacher', '-classroom.teachers', '-classroom.students')  # Avoid recursion

    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email or '.' not in email:
            raise AssertionError('Email must contain @ and .')
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


# Subject model
class Subject(db.Model, SerializerMixin):
    __tablename__ = 'subjects'

    id = db.Column(db.Integer, primary_key=True)  # Primary key
    name = db.Column(db.String(120), nullable=False)  # Subject name

    # Relationship with TeacherSubject
    teacher_subjects = db.relationship('TeacherSubject', back_populates='subject', cascade='all, delete-orphan')
    # Relationship with StudentSubject
    student_subjects = db.relationship('StudentSubject', back_populates='subject', cascade='all, delete-orphan')
    # Association proxy to teachers through teacher_subjects
    teachers = association_proxy('teacher_subjects', 'teacher')
    # Association proxy to students through student_subjects
    students = association_proxy('student_subjects', 'student')

    serialize_rules = ('-teachers.subjects', '-students.subjects', '-teacher_subjects.subject', '-student_subjects.subject')  # Avoid recursion

    def __repr__(self):
        return f'<Subject(id={self.id}, name={self.name})>'


# TeacherSubject model
class TeacherSubject(db.Model, SerializerMixin):
    __tablename__ = 'teacher_subjects'

    id = db.Column(db.Integer, primary_key=True)  # Primary key
    topic = db.Column(db.String(30), nullable=False)  # Topic of the subject
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'))  # Foreign key to Teacher
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'))  # Foreign key to Subject

    # Relationship with Teacher
    teacher = db.relationship('Teacher', back_populates='teacher_subjects')
    # Relationship with Subject
    subject = db.relationship('Subject', back_populates='teacher_subjects')

    serialize_rules = ('-teacher.teacher_subjects', '-subject.teacher_subjects')  # Avoid recursion

    def __repr__(self):
        return f'<TeacherSubject(topic={self.topic})>'


# Student model
class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)  # Primary key
    name = db.Column(db.String(120), nullable=False)  # Student's name
    classroom_id = db.Column(db.Integer, db.ForeignKey('classrooms.id'))  # Foreign key to Classroom

    # Relationship with StudentSubject
    student_subjects = db.relationship('StudentSubject', back_populates='student', cascade='all, delete-orphan')
    # Association proxy to subjects through student_subjects
    subjects = association_proxy('student_subjects', 'subject')

    serialize_rules = ('-subjects.students', '-student_subjects.student', '-classroom.students', '-classroom.teachers')  # Avoid recursion

    def __repr__(self):
        return f'<Student(id={self.id}, name={self.name})>'


# StudentSubject model
class StudentSubject(db.Model, SerializerMixin):
    __tablename__ = 'student_subjects'

    id = db.Column(db.Integer, primary_key=True)  # Primary key
    topic = db.Column(db.String(30), nullable=False)  # Topic of the subject
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))  # Foreign key to Student
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'))  # Foreign key to Subject

    # Relationship with Student
    student = db.relationship('Student', back_populates='student_subjects')
    # Relationship with Subject
    subject = db.relationship('Subject', back_populates='student_subjects')

    serialize_rules = ('-student.student_subjects', '-subject.student_subjects')  # Avoid recursion

    def __repr__(self):
        return f'<StudentSubject(topic={self.topic})>'


# Classroom model
class Classroom(db.Model, SerializerMixin):
    __tablename__ = 'classrooms'

    id = db.Column(db.Integer, primary_key=True)  # Primary key
    name = db.Column(db.String(30), nullable=False, unique=True)  # Classroom name, unique

    # Relationship with Teacher and Student
    teachers = db.relationship('Teacher', backref='classroom', cascade='all, delete-orphan')
    students = db.relationship('Student', backref='classroom', cascade='all, delete-orphan')

    serialize_rules = ('-teachers.classroom', '-students.classroom')  # Avoid recursion

    def __repr__(self):
        return f'<Classroom(id={self.id}, name={self.name})>'
