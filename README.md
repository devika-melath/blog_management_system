# Blog Management System

A full-stack blog management application built with Django REST Framework (backend) and React.js (frontend).

## Features

- User registration and authentication (Token-based)
- Admin can create users via API
- CRUD operations on blog posts (owner-only edit/delete)
- Comments on blog posts (owner-only edit/delete)
- View all blog posts by any user
- Proper access controls and validations

---

## Backend Setup (Django)

### Prerequisites
- Python 3.10+

### Steps

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (admin)
python manage.py createsuperuser

# Start server
python manage.py runserver
```

Backend runs at: `http://localhost:8000`

### API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/accounts/register/ | Register new user | No |
| POST | /api/accounts/login/ | Login | No |
| POST | /api/accounts/create-user/ | Admin creates user | Admin |
| GET | /api/posts/ | List all posts | No |
| POST | /api/posts/ | Create post | Yes |
| GET | /api/posts/{id}/ | Get post detail | No |
| PUT | /api/posts/{id}/ | Update post | Owner |
| DELETE | /api/posts/{id}/ | Delete post | Owner |
| GET | /api/posts/{id}/comments/ | List comments | No |
| POST | /api/posts/{id}/comments/ | Add comment | Yes |
| PUT | /api/posts/{id}/comments/{id}/ | Update comment | Owner |
| DELETE | /api/posts/{id}/comments/{id}/ | Delete comment | Owner |

---

## Frontend Setup (React.js)

### Prerequisites
- Node.js 18+

### Steps

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

## Project Structure

```
├── backend/
│   ├── blog_project/       # Django project settings
│   ├── accounts/           # User auth app
│   ├── posts/              # Blog posts & comments app
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── api.js          # Axios API helper
│   │   └── App.jsx         # Main app with routing
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Tech Stack

- **Backend:** Django 4.2, Django REST Framework, SQLite
- **Frontend:** React 18, React Router, Axios, Vite
- **Auth:** Token-based authentication (DRF TokenAuth)
