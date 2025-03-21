# Project Setup and Deployment Guide

## **Hosted Links**

- **Frontend**: The frontend of the application is hosted at https://jktech.testingproject.space
- **Backend**: The backend of the application is hosted at https://jbc.testingproject.space
- **Database Diagram**: You can view the database diagram at https://dbdiagram.io/d/67dd907675d75cc844ffeec4

## **Database Schema**

The database consists of two primary tables:

![Database Diagram](https://i.imgur.com/example-image-url.jpg)
*Database diagram showing the relationship between users and posts tables*

### Users Table:
```sql
Table users {
  id int pk
  username varchar
  email varchar
  provider enum
  image varchar
}
```

### Posts Table:
```sql
Table post {
  id int pk
  title varchar
  description text
  imageKey varchar
  user_id int [ref:> users.id]
}
```

As shown in the diagram above, each post is associated with a user through the `user_id` foreign key.

## Setup Instructions

### 1. Clone the Repository
To get started, clone both the frontend and backend repositories from GitHub:

**Backend**:
```bash
git clone https://github.com/your-username/backend-repo.git
cd backend-repo
```

**Frontend**:
```bash
git clone https://github.com/your-username/frontend-repo.git
cd frontend-repo
```

### 2. Create Environment Files
For both frontend and backend, you need to create environment files (.env) for the configuration of the app.

**Backend**:
Copy the .env.example file to .env in the backend directory:
```bash
cp .env.example .env
```
Edit the .env file to configure your environment variables for the backend (e.g., database URL, JWT secret, etc.).

**Frontend**:
Copy the .env.example file to .env in the frontend directory:
```bash
cp .env.example .env
```
Edit the .env file to configure the frontend environment variables (e.g., API base URL for the backend).

### 3. Running the Application Locally

**Backend**:
- Navigate to the backend directory.
- Install dependencies:
  ```bash
  npm install
  ```
- Start the backend server using npm and PM2:
  ```bash
  npm run build
  pm2 start dist/main.js --name backend-app
  ```
- The backend will now be running at https://jbc.testingproject.space.

**Frontend**:
- Navigate to the frontend directory.
- Install dependencies:
  ```bash
  npm install
  ```
- Start the frontend server:
  ```bash
  npm start
  ```
- The frontend will be running at http://localhost:3000 (or the port specified in your .env file).

### 4. Deploy the Backend to AWS EC2

SSH into your EC2 instance:
```bash
ssh -i "your-key.pem" ec2-user@your-ec2-ip
```

Install dependencies on your EC2 instance:
```bash
sudo yum update -y
sudo yum install -y git
sudo yum install -y nodejs npm
```

Clone the backend repository on your EC2 instance:
```bash
git clone https://github.com/your-username/backend-repo.git
cd backend-repo
npm install
```

Build and run the backend app:
```bash
npm run build
pm2 start dist/main.js --name backend-app
```

Install and configure Nginx on the EC2 instance:
```bash
sudo yum install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

Configure Nginx to proxy requests to your backend. Open the Nginx config file:
```bash
sudo nano /etc/nginx/nginx.conf
```

Add the following inside the server block:
```nginx
server {
    listen 80;
    server_name jbc.testingproject.space;

    location / {
        proxy_pass http://127.0.0.1:3000; # Change the port to match your backend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Install Certbot to generate an SSL certificate:
```bash
sudo yum install -y certbot
sudo certbot --nginx -d jbc.testingproject.space
```

Test the configuration:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

The backend should now be running with an SSL certificate at https://jbc.testingproject.space.

### 5. Deploy the Frontend on Vercel

1. Go to Vercel and create a new project.
2. Connect your GitHub repository for the frontend.
3. Vercel will automatically detect the framework and set up the deployment process.
4. Once deployed, your frontend will be live at https://jktech.testingproject.space.

### 6. Database Diagram

You can view the database diagram at https://dbdiagram.io/d/67dd907675d75cc844ffeec4

The database diagram shows the relationship between the `users` and `post` tables. Each post is linked to a user through the `user_id` foreign key, establishing a one-to-many relationship where one user can have multiple posts.

## How the Application Works

- **Frontend**: The frontend application is a React-based SPA (Single Page Application) hosted on Vercel. It interacts with the backend API and displays data to users.
- **Backend**: The backend is built with NestJS and deployed on an AWS EC2 instance. It handles API requests from the frontend and interacts with the database.
- **Database**: The backend is connected to a relational database (as shown in the database diagram) which stores application data.
- **SSL**: The backend is secured with an SSL certificate generated using Certbot, ensuring secure communication between the client and server.

## Links

- **Frontend URL**: https://jktech.testingproject.space
- **Backend URL**: https://jbc.testingproject.space
- **Database Diagram**: https://dbdiagram.io/d/67dd907675d75cc844ffeec4

## Important Notes

- Make sure you have the correct domain configurations set up for both the frontend (Vercel) and backend (AWS EC2 with Nginx).
- Don't forget to renew the SSL certificate when it's about to expire. Certbot will typically handle this automatically.
