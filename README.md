# EmployWise – React User Management App

EmployWise is a frontend React application that integrates with the Reqres API to perform user login, listing, editing, and deletion functionalities. The project is fully responsive, styled using Tailwind CSS, and supports dark/light mode toggling.

---

## 🚀 Features

- Login with token-based session storage
- Paginated user listing (using left/right slider arrows)
- Edit user with pre-filled form
- Delete user from the list
- Temporary UI updates (since Reqres API is mock-only)
- Dark/Light mode toggle
- Fully responsive design using Tailwind CSS

---

## 🔧 Technologies Used

- React.js (with React Router DOM)
- Axios for API calls
- Tailwind CSS for styling
- Reqres.in as the API
- Session Storage for token persistence

---

## 📦 Installation

Follow the steps below to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/employwise.git
cd employwise
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 4. Configure Tailwind

In `tailwind.config.js`, add:

```js
content: ["./src/**/*.{js,jsx,ts,tsx}"],
darkMode: 'class',
```

### 5. Import Tailwind in `index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## ▶️ Run the Project

```bash
npm start
```

---

## 🔐 Login Credentials (as per Reqres API)

- **Email**: eve.holt@reqres.in  
- **Password**: cityslicka

---

## 🧪 Functionality Overview

| Feature     | Description |
|-------------|-------------|
| **Login**   | Authenticates using Reqres API and stores token in sessionStorage |
| **User List** | Fetches users from `GET /api/users?page=1` and shows them in card layout |
| **Edit User** | Updates UI temporarily using `PUT /api/users/:id` and navigation state |
| **Delete User** | Deletes user from UI via `DELETE /api/users/:id` |
| **Dark Mode** | Toggle using Tailwind dark mode support |
| **Pagination** | Slider-style prev/next buttons |

---

## 📂 Folder Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── DarkModeToggle.jsx
│   └── LogoutButton.jsx
├── pages/
│   ├── Login.jsx
│   ├── UserList.jsx
│   └── EditList.jsx
├── services/
│   └── api.js
├── utils/
│   └── auth.js
├── App.js
└── index.js
```

---

## 🌐 Hosted Link :
```text
https://employwise-demo.vercel.app/
```

## 📌 Notes

- API is mock-only, so data isn’t actually saved or changed on backend.
- Edits and deletes are reflected in UI only during the session.
- Navigation between pages is managed using React Router.

---

## 📄 License

This project is for educational/demo purposes. Feel free to fork and build upon it.
