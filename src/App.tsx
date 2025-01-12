import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import Navbar from "./pages/navbar";
import Footer from "./pages/footer";
import { SnackbarProvider } from "notistack";


const App: React.FC = () => {
  return (

    <SnackbarProvider
    iconVariant={{
      success: '✅',
      error: '✖️',
      warning: '⚠️',
      info: 'ℹ️',
    }}
    maxSnack={3} // Máximo número de notificaciones visibles
    anchorOrigin={{
      vertical: "top",
      horizontal: "center",
    }} autoHideDuration={3000} 
  >
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
    </SnackbarProvider>
  );
};

export default App;