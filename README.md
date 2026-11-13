# 🛒 ShopList – Shopping List App
<img src="https://socialify.git.ci/Siyanda-Mabaso/shopping-app/image?font=Source+Code+Pro&language=1&name=1&owner=1&pattern=I+Like+Food&stargazers=1&theme=Dark" alt="shopping-app" width="640" height="320" />

Application built with React and TypeScript. It helps users organise their shopping, manage items and keep track of completed purchases.

 Features

- **User Authentication:** Register and log in to your account.
- **Shopping Lists:** Create and manage multiple shopping lists.
- **Categories:** Organise shopping lists by category.
- **Item Management:** Add, edit and delete shopping items.
- **Quantity Management:** Specify the quantity of each item.
- **Track Completed Items:** Mark items as done using checkboxes.
- **Search:** Search for shopping lists by name.
- **Dashboard:** View shopping lists, total items and completed items.
- **Profile:** Access your user profile.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type safety |
| Redux Toolkit | State management |
| React Router | Navigation |
| Axios | HTTP requests |
| CSS Modules | Component styling |
| JSON Server | Mock REST API |
| Vite | Development server |

 📁 Project Structure


shopping-app/
├── public/
├── src/
│   ├── Components/
│   ├── Pages/
│   │   ├── LandingPage/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── SignUp/
│   │   └── Profile/
│   ├── ReduxSlice/
│   ├── Store/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── db.json
├── package.json
└── README.md


 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd shopping-app
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start JSON Server

Open a terminal in the project folder and run:

```bash
json-server db.json --port 4000
```

The API will be available at:

```text
http://localhost:4000
```

### 5. Start the React Application

Open a second terminal and run:

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## 👩‍💻 Author

Developed as part of a learning project.

---

**ShopList – Make Shopping Simple! 🛒**
