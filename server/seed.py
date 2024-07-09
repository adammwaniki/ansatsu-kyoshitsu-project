<<<<<<< HEAD
=======
#!/usr/bin/env python3

from faker import Faker
from random import choice as rc, randint

from app import app, db
from models import Teacher, Student, Subject, TeacherSubject, StudentSubject, Classroom

fake = Faker()

with app.app_context():
    db.create_all()

    # Create some classrooms
    classrooms = [Classroom(name=fake.word()) for _ in range(5)]
    db.session.add_all(classrooms)
    db.session.commit()

    # Create some teachers
    teachers = []
    for _ in range(10):
        teacher = Teacher(
            name=fake.name(),
            email=fake.unique.email(),
            password='password',  # Use a simple password for seeding
            classroom_id=rc(classrooms).id
        )
        teachers.append(teacher)
    db.session.add_all(teachers)
    db.session.commit()

    # Create some students
    students = []
    for _ in range(50):
        student = Student(
            name=fake.name(),
            classroom_id=rc(classrooms).id
        )
        students.append(student)
    db.session.add_all(students)
    db.session.commit()

    # Create some subjects
    subjects = []
    for _ in range(20):
        subject = Subject(
            name=fake.word()
        )
        subjects.append(subject)
    db.session.add_all(subjects)
    db.session.commit()

    # Create some teacher_subject relationships
    teacher_subjects = []
    for teacher in teachers:
        for _ in range(randint(1, 3)):  # Each teacher teaches 1 to 3 subjects
            ts = TeacherSubject(
                topic=fake.word(),
                teacher_id=teacher.id,
                subject_id=rc(subjects).id
            )
            teacher_subjects.append(ts)
    db.session.add_all(teacher_subjects)
    db.session.commit()

    # Create some student_subject relationships
    student_subjects = []
    for student in students:
        for _ in range(randint(1, 5)):  # Each student studies 1 to 5 subjects
            ss = StudentSubject(
                topic=fake.word(),
                student_id=student.id,
                subject_id=rc(subjects).id
            )
            student_subjects.append(ss)
    db.session.add_all(student_subjects)
    db.session.commit()
>>>>>>> 9009641b578315d532d98fea76890dadf158cc62
