import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, } from "@mui/material";
const CategoriaModal = ({ open, onClose, onSave, nombre, descripcion, setNombre, setDescripcion, isEditing, }) => {
    return (_jsxs(Dialog, { open: open, onClose: onClose, children: [_jsx(DialogTitle, { children: isEditing ? "Editar Categoría" : "Agregar Categoría" }), _jsxs(DialogContent, { children: [_jsx(TextField, { label: "Nombre", fullWidth: true, margin: "dense", value: nombre, onChange: (e) => setNombre(e.target.value) }), _jsx(TextField, { label: "Descripci\u00F3n", fullWidth: true, margin: "dense", value: descripcion, onChange: (e) => setDescripcion(e.target.value) })] }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: onClose, children: "Cancelar" }), _jsx(Button, { onClick: onSave, color: "primary", variant: "contained", children: "Guardar" })] })] }));
};
export default CategoriaModal;
