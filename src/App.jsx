import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";

// Auth Pages
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

// Dashboard Pages
import Images from "./pages/dashboard/images";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard */}
        <Route path="/dashboard/images" element={<Images />} />
        <Route path="/dashboard/integration" element={<Images />} />
      </Routes>
    </div>
  );
}

export default App;
