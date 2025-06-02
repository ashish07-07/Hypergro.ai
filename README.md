# Hypergro.ai Backend API Documentation

## API Endpoints

### Authentication





1. **User Registration**
   ```bash
POST https://hypergro-ai-ak3e.onrender.com/userreg/register

  Request Body 
  {
  "name": "User Full Name",
  "email": "user@example.com",
  "password": "securepassword123"
}

2. Login Route
```bash
POST https://hypergro-ai-ak3e.onrender.com/userlog/login
Request Body
{
  "email": "registered@example.com",
  "password": "123456"
}
```
3 Create environment file from template
cp .env.example .env

  Database Setup
```bash
# Run Prisma migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate
```

4. Frontend Setup
```bash
cd ../client
npm install

# Create frontend environment file
cp .env.example .env.local
```

Running the Application
```bash
# Build andstart  backend
cd backend
npm run build
npm run start

# Start frontend (in new terminal)
cd ../client
npm run dev


