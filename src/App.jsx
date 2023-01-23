import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";

// Auth Pages
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Verified from "./pages/auth/Verified";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Dashboard Pages
import Spaces from "./pages/dashboard/Spaces/Spaces";
import SpaceDetail from "./pages/dashboard/Spaces/SpaceDetail";
import CreateSpace from "./pages/dashboard/CreateSpace";
import ApiIntegration from "./pages/dashboard/ApiIntegration";
import Profile from "./pages/dashboard/account/Profile";
import SuccessPayment from "./pages/payment status/SuccessPayment";
import FailedPayment from "./pages/payment status/FailedPayment";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname == "/") {
      navigate("/login");
    }
  });
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
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/spaces/:spaceId" element={<SpaceDetail />} />
        <Route path="/integration" element={<ApiIntegration />} />
        <Route path="/create_space" element={<CreateSpace />} />
        <Route path="/account" element={<Profile />} />

        {/* Payment */}
        <Route path="/success" element={<SuccessPayment />} />
        <Route path="/failed" element={<FailedPayment />} />
      </Routes>
    </div>
  );
}

export default App;
