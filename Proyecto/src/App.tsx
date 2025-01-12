import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import Navbar from "./pages/navbar";
import Footer from "./pages/footer";

const App: React.FC = () => {
  return (
    <Router>
      <div id="root">
        <Navbar />
        <main className="main-content">
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
