import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar2 from "./components/Routing/Navbar2";
// import VehicleList from "./components/VehicleList";
import Overview from "./components/Homepage/Overview";
import VehicleCollection from "./components/Vehicles/VehicleCollection";
import VehicleDetail from "./components/Vehicles/VehicleDetail";
import MapViewer from "./components/Map/MapViewer";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import Profile from "./components/User/Profile";
import VehicleFavorites from "./components/Vehicles/VehicleFavorites";
import PageNotFound from "./components/Routing/PageNotFound";
import ProtectedRoute from "./components/Routing/ProtectedRoute";
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
              <div className="content-container">
                <Routes>
                  <Route path="/" element={<Overview />} />
                  <Route path="/collection" element={<VehicleCollection />} />
                  <Route path="/vehicle/:slug" element={<VehicleDetail />} />
                  <Route path="/map" element={<MapViewer />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/favorites"
                    element={
                      <ProtectedRoute>
                        <VehicleFavorites />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </div>
            </Router>
          </FavoritesProvider>
        </AuthProvider>
      </AlertProvider>
    </div>
  );
}

export default App;
