import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import "../styles/notfound.css"; // Archivo de estilos para animaciones y diseño
const NotFound = () => {
    const navigate = useNavigate();
    const redirectToHome = () => {
        navigate("/");
    };
    return (_jsxs("div", { className: "not-found-container", children: [_jsx("div", { className: "animation-wrapper", children: _jsxs("div", { className: "girl-animation", children: [_jsx("div", { className: "head" }), _jsx("div", { className: "hair" }), _jsx("div", { className: "body" }), _jsxs("div", { className: "arms", children: [_jsx("div", { className: "left-arm" }), _jsx("div", { className: "right-arm" })] }), _jsxs("div", { className: "hands", children: [_jsx("div", { className: "left-hand" }), _jsx("div", { className: "right-hand" })] }), _jsxs("div", { className: "legs", children: [_jsx("div", { className: "left-leg" }), _jsx("div", { className: "right-leg" })] }), _jsxs("div", { className: "table", children: [_jsx("div", { className: "tools" }), _jsx("div", { className: "jewelry" })] })] }) }), _jsxs("div", { className: "message-container", children: [_jsx("h1", { children: "Error 404" }), _jsx("p", { children: "P\u00E1gina no encontrada, por favor regrese aqu\u00ED." }), _jsx("button", { className: "home-button", onClick: redirectToHome, children: "Ir a Inicio" })] })] }));
};
export default NotFound;
