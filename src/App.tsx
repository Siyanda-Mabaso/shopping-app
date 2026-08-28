import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
// import ListDetails from "./Pages/ListDetails/ListDetails"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/home" element={<Home />} />

        <Route path="/profile" element={<Profile />} />

        {/* <Route path="/list/:id" element={<ListDetails />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;