import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

// Auth Pages
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

// Dashboard Pages
import Images from "./pages/dashboard/images";
import Spaces from "./pages/dashboard/Spaces";
import CreateSpace from "./pages/dashboard/CreateSpace";
import ApiIntegration from "./pages/dashboard/ApiIntegration";

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
        <Route path="/dashboard/integration" element={<ApiIntegration />} />
        <Route path="/dashboard/spaces" element={<Spaces />} />
        <Route path="/dashboard/create_space" element={<CreateSpace />} />
      </Routes>
    </div>
  );
}

export default App;
