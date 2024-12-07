import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import { configureStore } from "./store/configureStore";
import LoginPage from "./components/Auth/Login";

import AdminMainPage from "./components/Main/AdminMainPage";
import AcademicianMainPage from "./components/Academician/AcademicianMain";
import StudentMainPage from "./components/Student/StudentMain";
import NotFoundPage from "./components/NotFoundPage";
import AdminPage from "./components/Admin/Admin";
import LessonTable from "./components/Admin/Tables/LessonTable";
import LessonDetailsPage from "./components/Student/LessonDetailsPage";
import MessagingPage from "./components/Student/Messages";
import AcademicianProjectTable from "./components/Academician/AcademicianProjectTable";
import AkademisyenDersAtama from "./components/Admin/Tables/AkademisyenDersAtama.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Admin" element={<AdminMainPage />} />
        <Route path="/Akademisyen" element={<AcademicianMainPage />} />
        <Route
          path="/Akademisyen/Proje-Tablosu"
          element={<AcademicianProjectTable />}
        />
        <Route
          path="/Akademisyen/DersAtama"
          element={<AkademisyenDersAtama />}
        />
        <Route path="/Ogrenci" element={<StudentMainPage />} />
        <Route path="Admin/LessonTable" element={<LessonTable />} />
        <Route
          path="Ogrenci/LessonDetailsPage"
          element={<LessonDetailsPage />}
        />
        <Route path="messages" element={<MessagingPage />} />
        <Route path="/Error" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
