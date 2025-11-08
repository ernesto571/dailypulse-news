# 📰 DailyPulse News

**DailyPulse News** is a full-stack MERN application that delivers the latest global news using the [NewsAPI.org](https://newsapi.org/) service.  
It features user authentication, personalized bookmarks, and a clean, responsive interface built for speed and simplicity.

---

## 🚀 Features

- 🔐 **User Authentication**  
  Secure signup, login, and logout with JWT-based sessions.  
  Includes Google OAuth integration for one-click sign-in.

- 🗞️ **Live News Feed**  
  Fetches and displays real-time news updates from **NewsAPI.org** with category-based filters.

- 💾 **Bookmarks**  
  Logged-in users can save, view, and manage bookmarked articles.

- 🌙 **Modern UI/UX**  
  Built with React + Tailwind CSS for a fast, mobile-friendly experience.

- ⚙️ **Full-Stack Integration**  
  RESTful API powered by Express and MongoDB for robust backend management.

---

## 🧰 Tech Stack

### Frontend
- React (Vite)
- Zustand (State Management)
- Axios
- React Hot Toast
- Tailwind CSS

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Token (JWT)
- Passport.js (Google OAuth 2.0)
- bcrypt.js

---

## ⚡️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- NewsAPI API key ([get one here](https://newsapi.org/))
- Google OAuth credentials (optional, for Google sign-in)

---

### 🔧 Installation

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/dailypulse-news.git
cd dailypulse-news
```

#### 2. Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

#### 3. Create environment variables

**Backend (.env):**
```
PORT=5001
MONGO_URI=your_mongo_connection_string
NODE_ENV=development
JWT_SECRET=your_secret_key
NEWS_API_KEY=your_newsapi_key
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### ▶️ Run the app

#### Backend:
```bash
cd backend
npm run dev
```

#### Frontend:
```bash
cd frontend
npm run dev
```

Then open your browser at **http://localhost:5173**

---

## 🌍 Deployment

You can deploy the backend to **Render**, **Vercel**, or **Railway**, and host the frontend on **Vercel** or **Netlify**.

Remember to:
- Use `https` for production.
- Update your OAuth redirect URLs in Google Cloud Console.
- Set proper CORS and cookie configurations for cross-domain authentication.

---

## 🧠 Project Structure

```
dailypulse-news/
│
├── backend/
│   └── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── lib/
│   └── src/
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md
```

---

## 🧩 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/auth/signup` | Create new account |
| `POST` | `/api/auth/login` | Login existing user |
| `POST` | `/api/auth/logout` | Logout user |
| `GET` | `/api/auth/check` | Verify user authentication |
| `GET` | `/api/bookmarks` | Fetch all bookmarks |
| `POST` | `/api/bookmarks` | Add bookmark |
| `DELETE` | `/api/bookmarks/:id` | Remove bookmark |
| `GET` | `/api/news` | Fetch latest news articles |

---

## 💡 Future Enhancements
- User profile customization  
- Dark mode toggle  
- Push notifications for trending headlines  
- AI-powered topic recommendations

---

## 🧑‍💻 Author
**Emmanuel Cruz**  
Full-stack Developer  
[GitHub](https://github.com/ernesto571 ) | [LinkedIn](https://linkedin.com/in/yourprofile)
