import { Fragment } from "react";
import "./App.css";
import { Navbar } from "./components/layout/Navbar";
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import Register from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { Alerts } from "./components/layout/Alerts";
import PrivateRoute from "./components/routing/PrivateRoute";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Routes>
                  <Route path="/" element={<PrivateRoute component={Home} />} />
                  <Route path="about" element={<About />} />
                  <Route path="register" element={<Register />} />
                  <Route path="login" element={<Login />} />
                </Routes>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
