# JavaScript Challenge Solution

This repository contains solutions for the JavaScript Challenge, consisting of two main parts:

## 📁 Project Structure

```
Pinnacle_JavaScript_Challenge_Solution/
├── arrayTasks.js          # Part 1: Array manipulation functions
├── server.js              # Part 2: Express REST API
├── test_api.ps1           # PowerShell script to test the API
├── README.md              # This file
└── JavaScript Challenges.pdf  # Original challenge document
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **PowerShell** (for running test scripts on Windows)

### Installation

1. **Clone or download** this repository to your local machine
2. **Navigate** to the project directory:
   ```bash
   cd JavaScript_Challenge_Solution
   ```

3. **Install dependencies**:
   ```bash
   npm install express
   ```

## 📋 Part 1: Array Tasks (`arrayTasks.js`)

This file contains various array manipulation functions working with a sample user dataset.

### Running Part 1

```bash
node arrayTasks.js
```

### Functions Included

- `reverse_users()` - Reverses the order of users
- `remove_duplicates()` - Removes users with duplicate IDs
- `remove_exact_duplicates()` - Removes completely identical user objects
- `unique_countries()` - Returns list of unique countries
- `group()` - Groups users by country
- `older_than_25()` - Filters and sorts users older than 25
- `names()` - Extracts just the names from user objects

### Sample Output

```
1. Reversed IDs: [6, 5, 4, 3, 2, 1]
2. Unique by ID: [1, 2, 3, 4, 5, 6]
3. Unique Countries: ['USA', 'India', 'UK']
4. Grouped by Country: ['USA', 'India', 'UK']
5. Older than 25 (sorted): ['Bob:30', 'David:30', 'Charlie:35']
6. Names: ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Alice']
```

## 🌐 Part 2: Express REST API (`server.js`)

A complete RESTful API for managing user data with full CRUD operations.

### Running Part 2

1. **Start the server**:
   ```bash
   node server.js
   ```

2. **Server will start** on `http://localhost:3000`

3. **Test the API** using the provided PowerShell script:
   ```powershell
   .\test_api.ps1
   ```

### API Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/` | Health check | - | Server status message |
| `GET` | `/users` | Get all users | - | Array of all users |
| `GET` | `/users/:id` | Get user by ID | - | Single user object |
| `POST` | `/users` | Create new user | `{name, country, age}` | Created user object |
| `PUT` | `/users/:id` | Update user | `{name?, country?, age?}` | Updated user object |
| `DELETE` | `/users/:id` | Delete user | - | Deleted user object |
| `GET` | `/search?country=value` | Search by country | - | Array of matching users |

### API Examples

#### Create a new user
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","country":"Canada","age":28}'
```

#### Get user by ID
```bash
curl http://localhost:3000/users/1
```

#### Update user age
```bash
curl -X PUT http://localhost:3000/users/2 \
  -H "Content-Type: application/json" \
  -d '{"age":31}'
```

#### Search users by country
```bash
curl "http://localhost:3000/search?country=USA"
```

#### Delete a user
```bash
curl -X DELETE http://localhost:3000/users/6
```

## 🧪 Testing

### Automated Testing
Run the provided PowerShell script to test all API endpoints:
```powershell
.\test_api.ps1
```

### Manual Testing
You can also test the API manually using:
- **Postman** or **Insomnia** for GUI testing
- **curl** commands in terminal
- **Browser** for GET requests

## 📊 Data Validation

The API includes comprehensive validation for:
- **Name**: Required string, trimmed
- **Country**: Required string, trimmed  
- **Age**: Integer between 0-120
- **ID**: Positive integer, unique

## 🔧 Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## 🛠️ Technical Features

### ES6+ Features Used
- Arrow functions
- Template literals
- Destructuring assignment
- Spread operator
- `const` and `let`
- `Array.from()` with Set
- Modern array methods

### RESTful Design
- Proper HTTP methods
- Correct status codes
- RESTful URL structure
- Query parameters for search
- JSON request/response format

## 📝 Notes

- The server uses in-memory storage (data resets on restart)
- All endpoints include proper error handling
- Input validation prevents invalid data
- Logging middleware tracks request performance
- CORS support can be added if needed

## 🤝 Contributing

This is a challenge submission, but feel free to suggest improvements or report issues.
