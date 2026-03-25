# 🚀 User Management REST API (Node.js)

A simple yet production-ready **User Management REST API** built using **Node.js**, **Express**, and **SQLite**. This project demonstrates CRUD operations, filtering, sorting, and clean backend architecture—ideal for backend assessments.

---

## 📌 Features

* ✅ Create, Read, Update, Delete users
* 🔍 Search users by name or email
* 💾 Persistent storage using SQLite
* ⚡ Lightweight and fast

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **SQLite** (via `better-sqlite3`)

---


## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd user-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the server

```bash
node server.js
```

Server will start at:

```
http://localhost:5000
```

---

## 📡 API Endpoints

### 🔹 1. Get All Users

```
GET /users
```

#### Query Parameters:

| Param  | Description                           |
| ------ | ------------------------------------- |
| search | Search by name or email               |
| sort   | Field to sort (e.g. name, email, age) |
| order  | asc or desc                           |

#### Example:

```
GET /users?search=john
```

---

### 🔹 2. Get User by ID

```
GET /users/:id
```

#### Example:

```
GET /users/1
```

#### Response:

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}
```

---

### 🔹 3. Create User

```
POST /users/add
```

#### Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}
```

#### Response:

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}
```

---

### 🔹 4. Update User

```
PUT /users/update/:id
```

#### Request Body:

```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "age": 30
}
```

#### Notes:

* Partial updates supported
* Only provided fields will be updated

---

### 🔹 5. Delete User

```
DELETE /users/del/:id
```

#### Response:

```json
{
  "message": "User deleted successfully"
}
```

---

## 🗄️ Database Schema

| Field | Type    | Description         |
| ----- | ------- | ------------------- |
| id    | INTEGER | Primary Key         |
| name  | TEXT    | User name           |
| email | TEXT    | Unique email        |
| age   | INTEGER | User age (optional) |

---

## ❗ Error Handling

| Scenario             | Response        |
| -------------------- | --------------- |
| Missing fields       | 400 Bad Request |
| Duplicate email      | 400 Bad Request |
| User not found       | 404 Not Found   |
| Invalid query params | 400 Bad Request |

---

## 🧪 Testing the API

You can test using:

* Postman
* Insomnia
* Curl

### Example Curl Request:

```bash
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{"name":"John","email":"john@test.com","age":25}'
```

---


## 💡 Final Notes

This project is designed to:

* Demonstrate backend fundamentals
* Showcase clean API design
* Be easy to understand and extend

If you're submitting this for an assessment, consider adding:

* Comments in code
* API documentation (Swagger)
* Deployment link

---

Happy Coding! 🎯
