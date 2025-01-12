import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CircularProgress from "@mui/material/CircularProgress";
const Loading = () => {
    return (_jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }, children: [_jsx(CircularProgress, {}), _jsx("p", { style: { marginTop: "10px", fontSize: "18px", fontWeight: "bold" }, children: "Cargando..." })] }));
};
export default Loading;
