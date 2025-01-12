import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import Navbar from "./pages/navbar";
import Footer from "./pages/footer";
import { SnackbarProvider } from "notistack";
const App = () => {
    return (_jsx(SnackbarProvider, { iconVariant: {
            success: '✅',
            error: '✖️',
            warning: '⚠️',
            info: 'ℹ️',
        }, maxSnack: 3, anchorOrigin: {
            vertical: "top",
            horizontal: "center",
        }, autoHideDuration: 3000, children: _jsx(Router, { children: _jsxs("div", { id: "root", children: [_jsx(Navbar, {}), _jsx("main", { className: "main-content", children: _jsx(Routes, { children: routes.map((route, index) => (_jsx(Route, { path: route.path, element: route.element }, index))) }) }), _jsx(Footer, {})] }) }) }));
};
export default App;
