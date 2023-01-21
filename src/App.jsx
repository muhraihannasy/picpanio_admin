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
import Verified from "./pages/auth/Verified";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Profile from "./pages/dashboard/account/Profile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify/register/:userid/:token" element={<Verified />} />
        <Route
          path="/verify/forgotpassword/:userid/:token"
          element={<ForgotPassword />}
        />

        {/* Dashboard */}
        <Route path="/images" element={<Images />} />
        <Route path="/integration" element={<ApiIntegration />} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/spaces/:spaceId" element={<Images />} />
        <Route path="/create_space" element={<CreateSpace />} />
        <Route path="/account" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
