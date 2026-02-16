# 💬 SendTo – Real-Time MERN Chat Application

A modern and fully responsive **Real-Time Chat Application** built using the **MERN Stack**.

Users can register, log in, send real-time messages, share images, update their profile picture, and switch between beautiful UI themes.

🚀 Built with performance, scalability, and clean UI design in mind.

🔗 **GitHub Repository:**
[https://github.com/PavishK/SendTo_Simple_Chat_App](https://github.com/PavishK/SendTo_Simple_Chat_App)

---

# ✨ Features

* 🔐 User Authentication (Register / Login)
* 💬 One-to-One Real-Time Messaging
* 🖼️ Send & Receive Images (Cloudinary)
* 🟢 Online / Offline User Status
* 👤 Profile Picture Update
* 🎨 Multiple UI Themes (Dark, Light, Cyberpunk, Coffee, Retro)
* ⚡ Real-Time Communication using Socket.IO
* 🐻 Global State Management with Zustand
* 🔒 JWT Authentication & Protected Routes
* 🔐 Password Hashing using Bcrypt

---

# 🎨 Available Themes

Users can switch between:

* 🌙 Dark
* ☀️ Light
* ⚡ Cyberpunk
* ☕ Coffee
* 🎞 Retro

Theme preference can be stored locally for better user experience.

---

# 👤 Profile Picture Update

Users can:

* Upload a new profile picture
* Store image securely using Cloudinary
* Save image URL in MongoDB
* Instantly reflect updated avatar in chat UI

---

# 🛠 Tech Stack

## 🖥 Frontend (Client)

* React (Vite)
* Zustand
* Tailwind CSS
* DaisyUI
* Axios
* Socket.IO Client

## 🛠 Backend (Server)

* Node.js
* Express.js
* MongoDB + Mongoose
* Socket.IO
* Cloudinary
* JWT Authentication
* Bcrypt

---

# 📂 Project Structure

```
SendTo_Simple_Chat_App/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── .env
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── lib/
│   ├── .env
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/PavishK/SendTo_Simple_Chat_App.git
cd SendTo_Simple_Chat_App
```

---

# 🔧 Backend Environment Variables

Create a `.env` file inside `/server`

```
PORT=8000
CLIENT_URL=http://localhost:5173

MONGODB_URL=your_mongodb_url_here

SALT=your_salt_number_here
JWT_SECRET=your_secret_here
NODE_ENV=dev

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🚀 Start Backend

```bash
cd server
npm install
npm run dev
```

---

# 🌐 Frontend Environment Variables

Create a `.env` file inside `/client`

```
VITE_SERVER_URL=http://localhost:8000
```

---

## 🚀 Start Frontend

```bash
cd client
npm install
npm run dev
```

---

# 🔌 Real-Time Communication Flow

1. User logs in
2. Socket.IO connection is established
3. Online users are tracked
4. Messages are emitted instantly
5. Images are uploaded to Cloudinary
6. Message stored in MongoDB
7. Receiver gets message in real-time

---

# 🖼 Application Preview

(Add your images below)

```md
## 🔐 Login Page
![Login Image Here](IMAGE_LINK_HERE)

## 💬 Chat Interface
![Chat Image Here](IMAGE_LINK_HERE)

## 👤 Profile Picture Update
![Profile Image Here](IMAGE_LINK_HERE)

## 🎨 Themes (Dark / Light / Cyberpunk / Coffee / Retro)
![Themes Image Here](IMAGE_LINK_HERE)
```

Replace `IMAGE_LINK_HERE` with your uploaded image URL or GitHub image path.

---

# 🌍 Environment Variables Summary

## Server

| Variable              | Description               |
| --------------------- | ------------------------- |
| PORT                  | Backend running port      |
| CLIENT_URL            | Frontend URL              |
| MONGODB_URL           | MongoDB connection string |
| SALT                  | Bcrypt salt rounds        |
| JWT_SECRET            | JWT secret key            |
| NODE_ENV              | Environment mode          |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name     |
| CLOUDINARY_API_KEY    | Cloudinary API key        |
| CLOUDINARY_API_SECRET | Cloudinary API secret     |

## Client

| Variable        | Description     |
| --------------- | --------------- |
| VITE_SERVER_URL | Backend API URL |

---

# 🚀 Future Improvements

* Group Chat
* Typing Indicator
* Read Receipts
* Emoji Support
* Message Delete Option
* File Sharing
* Push Notifications

---

# 👨‍💻 Author

**Pavish K**
MERN Stack Developer 🚀
GitHub: [https://github.com/PavishK](https://github.com/PavishK)

---

# 📜 License

This project is licensed under the MY License.