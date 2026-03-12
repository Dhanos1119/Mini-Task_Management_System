# Mini Task Management System

## Project Overview

The **Mini Task Management System** is a full-stack web application that allows administrators and users to manage tasks efficiently.

The system includes role-based access where **Admins** can assign tasks to users and monitor progress, while **Users** can view and manage their assigned tasks.

This project was developed using **Spring Boot for the backend** and **Next.js for the frontend**, with **PostgreSQL as the database**.

Main Features

User authentication using JWT

Role-based access control (Admin / User)

Admin dashboard to monitor all tasks

Admin can assign tasks to users

Users can create new tasks

Users can edit existing tasks

Users can delete tasks

Users can mark tasks as completed

Task status tracking (TODO, IN_PROGRESS, DONE)

Task priority levels (LOW, MEDIUM, HIGH)

Due date management for tasks

Task filtering by status and priority

Task search functionality

Pagination for task lists

Dashboard statistics (Total tasks, Completed tasks, Pending tasks)

Task distribution chart using Chart.js

PostgreSQL database integration

RESTful API using Spring Boot

Secure backend APIs with Spring Security

Frontend developed using Next.js and React

# 🛠 Technologies Used

### Backend

* Java
* Spring Boot
* Spring Security
* JWT Authentication
* Hibernate / JPA

### Frontend

* Next.js
* React
* Tailwind CSS
* Chart.js

### Database

* PostgreSQL

### Tools

* Maven
* pgAdmin
* VS Code

---

# Setup Instructions

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/mini-task-manager.git
```

Navigate to the project folder:

```bash
cd mini-task-manager
```

---

#  Database Configuration

Create a PostgreSQL database named:

```
taskdb
```

Update the database configuration in:

```
backend/src/main/resources/application.properties
```

Example configuration:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/taskdb
spring.datasource.username=postgres
spring.datasource.password=postgres

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

Make sure PostgreSQL server is running before starting the application.

---

#  Steps to Run the Application

## Run Backend (Spring Boot)

Navigate to backend folder:

```bash
cd backend
```

Run the application:

```bash
./mvnw spring-boot:run
```

The backend server will start at:

```
http://localhost:8080
```

---

## 2️⃣ Run Frontend (Next.js)

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:3000
```

---

#  Default Roles

| Role  | Access                             |
| ----- | ---------------------------------- |
| Admin | Assign tasks and monitor all tasks |
| User  | View and manage their own tasks    |

---

# System Modules

### Admin Dashboard

* View all tasks
* Assign tasks to users
* Monitor task progress
* View task statistics

### User Dashboard

* View assigned tasks
* Update task status
* Mark tasks as completed
* Edit or delete tasks

---

# Future Improvements

* Task progress percentage
* Email notifications
* File attachments
* User profile management
* Advanced task filtering

---

# Author

Dhanoshigan Ratnaraj

Mini Task Management System
Developed as a full-stack web application project.
