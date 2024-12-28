import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5krGSrH9mO408AoaEzDAfWi4-FZk6Yes",
  authDomain: "frontend-web-e454c.firebaseapp.com",
  projectId: "frontend-web-e454c",
  storageBucket: "frontend-web-e454c.appspot.com",
  messagingSenderId: "477577416048",
  appId: "1:477577416048:web:a9acef3ba4e0058f9fd3b5",
  measurementId: "G-PVHD7MMLSV",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
