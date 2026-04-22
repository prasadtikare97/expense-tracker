# Expense Tracker

A simple full-stack expense tracker application built with Spring Boot and React.

## Tech Stack
- Backend: Java, Spring Boot, Spring Data JPA, H2
- Frontend: React, Axios
- Database: H2 file-based database

## Features
- Add expenses
- View expenses
- Filter by category
- Sort by newest date
- View total amount
- Basic validation
- Idempotent expense creation using request id

## Project Structure
expense-tracker/
- backend/
- frontend/

## How to Run

### Backend
```bash
cd backend
./mvnw spring-boot:run