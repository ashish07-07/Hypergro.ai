# Hypergro.ai Backend API Documentation

## API Endpoints

### Authentication

#### `POST /userreg/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "User Full Name",
  "email": "user@example.com",
  "password": "securepassword123"
}


1. **** Register a new user account.
   ```bash

POST https://hypergro-ai-ak3e.onrender.com/userreg/register

json
{
  "name": "User Full Name",
  "email": "user@example.com",
  "password": "securepassword123"
}
```

2) *** User Login

```
POST Request 
 https://hypergro-ai-ak3e.onrender.com/userlog/login
Add your registered email and password
 {
  "email": "registered@gmail.com",
  "password": "123456"
}

