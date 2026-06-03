# School Microservices

Main folder: school-microservices
Services: registration, authentication, student, teacher, api-gateway

## Ports
- API Gateway      : 3000   (you send all Postman requests here)
- Registration     : 3001
- Authentication   : 3002
- Student          : 3003
- Teacher          : 3004

MongoDB: mongodb://127.0.0.1:27017/school_db  (make sure MongoDB is running)

## Setup (run once in EACH of the 5 folders)
    cd registration      &&  npm install
    cd authentication    &&  npm install
    cd student           &&  npm install
    cd teacher           &&  npm install
    cd api-gateway       &&  npm install

## Run (open 5 terminals, one per service)
    cd registration      &&  npm start
    cd authentication    &&  npm start
    cd student           &&  npm start
    cd teacher           &&  npm start
    cd api-gateway       &&  npm start

Each service should print "... MongoDB connected" and "... running on port ...".

================================================================
POSTMAN TESTS  (all go through the gateway: http://localhost:3000)
================================================================

# 9.1  REGISTER 1 STUDENT
POST http://localhost:3000/register/student
Body (raw -> JSON):
{
  "name": "Sophea Student",
  "email": "student1@school.com",
  "password": "pass123",
  "studentId": "S001",
  "grade": "12",
  "major": "Computer Science"
}

# 9.1  REGISTER 1 TEACHER
POST http://localhost:3000/register/teacher
Body (raw -> JSON):
{
  "name": "Dara Teacher",
  "email": "teacher1@school.com",
  "password": "pass123",
  "teacherId": "T001",
  "department": "Engineering",
  "subject": "IoT Systems"
}

# 10  LOGIN STUDENT  (copy token -> this is the STUDENT token)
POST http://localhost:3000/auth
{ "email": "student1@school.com", "password": "pass123" }

# 10  LOGIN TEACHER  (copy token -> this is the TEACHER token)
POST http://localhost:3000/auth
{ "email": "teacher1@school.com", "password": "pass123" }

----------------------------------------------------------------
For protected routes set the Authorization header:
  Key:   Authorization
  Value: Bearer <paste token here>
(Or in Postman: Authorization tab -> Type: Bearer Token -> paste token)
----------------------------------------------------------------

# 11.1  Student API + STUDENT token        -> 200 OK (student data)
GET http://localhost:3000/students

# 11.2  Student API + TEACHER token         -> 403 "Access forbidden. Students only."
GET http://localhost:3000/students

# 11.3  Student API + NO token              -> 401 "Access denied. No token provided."
GET http://localhost:3000/students

# 12.1  Teacher API + TEACHER token         -> 200 OK (teacher data)
GET http://localhost:3000/teachers

# 12.2  Teacher API + WRONG/TAMPERED token  -> 403 "Invalid or expired token."
GET http://localhost:3000/teachers
(Take the teacher token and delete or change a few characters in the middle.)

================================================================
9.2  MONGODB SCREENSHOT
Open MongoDB Compass -> database "school_db" -> collection "users"
You should see your 1 student and 1 teacher document. Screenshot it.
