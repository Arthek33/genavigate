import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar2 from "./components/Navbar2";
// import VehicleList from "./components/VehicleList";
import VehicleCollection from "./components/VehicleCollection";
import VehicleDetail from "./components/VehicleDetail";
import MapViewer from "./components/MapViewer";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import Profile from "./components/User/Profile";
import VehicleFavorites from "./components/VehicleFavorites";
import PageNotFound from "./components/PageNotFound";
import { AuthProvider } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import "./App.css";

function App() {
  return (
    <div className="app-container flex flex-col min-h-screen">
      <AlertProvider>
        <AuthProvider>
          <FavoritesProvider>
            <Router>
              {/* <Navbar /> */}
              <Navbar2 />
              <Routes>
                <Route path="/" element={<VehicleCollection />} />
                <Route path="/vehicle/:slug" element={<VehicleDetail />} />
                <Route path="/map" element={<MapViewer />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/favorites" element={<VehicleFavorites />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Router>
          </FavoritesProvider>
        </AuthProvider>
      </AlertProvider>
    </div>
  );
}

export default App;
