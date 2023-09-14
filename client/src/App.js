import { Fragment } from "react";
import "./App.css";
import { Navbar } from "./components/layout/Navbar";
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/about" Component={About} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
};

export default App;
