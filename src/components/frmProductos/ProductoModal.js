var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Checkbox, ListItemText, Select, OutlinedInput, InputLabel, FormControl, } from "@mui/material";
import { getCategorias } from "../../Services/categoriaService";
const ProductoModal = ({ open, onClose, onSave, producto, }) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [codigo, setCodigo] = useState("");
    const [imagenes, setImagenes] = useState([]);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [errors, setErrors] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        codigo: "",
        imagenes: "",
        categorias: "",
    });
    useEffect(() => {
        const fetchCategorias = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = yield getCategorias();
                setCategorias(data);
            }
            catch (error) {
                console.error("Error al cargar categorías:", error);
            }
        });
        fetchCategorias();
    }, []);
    useEffect(() => {
        if (producto) {
            setNombre(producto.nombre || "");
            setDescripcion(producto.descripcion || "");
            setPrecio(producto.precio ? producto.precio.toString() : "");
            setCodigo(producto.codigo || "");
            setImagenes(producto.imagenes || []);
            setCategoriasSeleccionadas(producto.categorias.map((categoria) => categoria.categoriaId) || []);
        }
        else {
            setNombre("");
            setDescripcion("");
            setPrecio("");
            setCodigo("");
            setImagenes([]);
            setCategoriasSeleccionadas([]);
        }
        setErrors({
            nombre: "",
            descripcion: "",
            precio: "",
            codigo: "",
            imagenes: "",
            categorias: "",
        });
    }, [producto, open]);
    const validateFields = () => {
        const newErrors = {
            nombre: nombre.trim() ? "" : "El nombre es obligatorio.",
            descripcion: descripcion.trim() ? "" : "La descripción es obligatoria.",
            precio: /^[0-9]+(\.[0-9]{1,2})?$/.test(precio)
                ? ""
                : "El precio debe ser un número válido.",
            codigo: codigo && codigo.trim().length > 50
                ? "El código no debe exceder los 50 caracteres."
                : "",
            imagenes: imagenes.some((img) => img.urlImagen.trim())
                ? ""
                : "Debe agregar al menos una imagen válida.",
            categorias: categoriasSeleccionadas.length > 0
                ? ""
                : "Debe seleccionar al menos una categoría.",
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };
    const handleAddImagen = () => {
        setImagenes([...imagenes, { id: 0, urlImagen: "", productoId: 0 }]);
    };
    const handleImagenChange = (index, url) => {
        const nuevasImagenes = [...imagenes];
        nuevasImagenes[index].urlImagen = url;
        setImagenes(nuevasImagenes);
    };
    const handleSave = () => {
        if (validateFields()) {
            onSave({
                nombre,
                descripcion,
                precio: parseFloat(precio),
                codigo: codigo.trim() || undefined,
                imagenes: imagenes.filter((img) => img.urlImagen.trim()),
                categorias: categoriasSeleccionadas.map((id) => ({ categoriaId: id })),
            });
            handleClose();
        }
    };
    const handleClose = () => {
        setNombre("");
        setDescripcion("");
        setPrecio("");
        setCodigo("");
        setImagenes([]);
        setCategoriasSeleccionadas([]);
        setErrors({
            nombre: "",
            descripcion: "",
            precio: "",
            codigo: "",
            imagenes: "",
            categorias: "",
        });
        onClose();
    };
    return (_jsxs(Dialog, { open: open, onClose: onClose, maxWidth: "sm", fullWidth: true, children: [_jsx(DialogTitle, { children: producto ? "Editar Producto" : "Agregar Producto" }), _jsx(DialogContent, { children: _jsxs(Box, { sx: { display: "flex", flexDirection: "column", gap: "1rem" }, children: [_jsx(TextField, { label: "Nombre", variant: "outlined", value: nombre, onChange: (e) => setNombre(e.target.value), error: !!errors.nombre, helperText: errors.nombre }), _jsx(TextField, { label: "Descripci\u00F3n", variant: "outlined", multiline: true, rows: 3, value: descripcion, onChange: (e) => setDescripcion(e.target.value), error: !!errors.descripcion, helperText: errors.descripcion }), _jsx(TextField, { label: "Precio", variant: "outlined", value: precio, onChange: (e) => setPrecio(e.target.value), error: !!errors.precio, helperText: errors.precio }), _jsx(TextField, { label: "C\u00F3digo (opcional)", variant: "outlined", value: codigo, onChange: (e) => setCodigo(e.target.value), error: !!errors.codigo, helperText: errors.codigo }), _jsxs(FormControl, { error: !!errors.categorias, children: [_jsx(InputLabel, { id: "categorias-label", children: "Categor\u00EDas" }), _jsx(Select, { labelId: "categorias-label", multiple: true, value: categoriasSeleccionadas, onChange: (e) => setCategoriasSeleccionadas(typeof e.target.value === "string"
                                        ? e.target.value.split(",").map(Number)
                                        : e.target.value), input: _jsx(OutlinedInput, { label: "Categor\u00EDas" }), renderValue: (selected) => categorias
                                        .filter((cat) => selected.includes(cat.id))
                                        .map((cat) => cat.nombre)
                                        .join(", "), children: categorias.map((categoria) => (_jsxs(MenuItem, { value: categoria.id, children: [_jsx(Checkbox, { checked: categoriasSeleccionadas.includes(categoria.id) }), _jsx(ListItemText, { primary: categoria.nombre })] }, categoria.id))) }), errors.categorias && _jsx(Box, { sx: { color: "error.main", mt: 1 }, children: errors.categorias })] }), imagenes.map((imagen, index) => (_jsx(TextField, { label: `URL de Imagen ${index + 1}`, variant: "outlined", value: imagen.urlImagen, onChange: (e) => handleImagenChange(index, e.target.value), error: !!errors.imagenes }, index))), _jsx(Button, { onClick: handleAddImagen, children: "Agregar Imagen" }), errors.imagenes && _jsx(Box, { sx: { color: "error.main" }, children: errors.imagenes })] }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleClose, color: "secondary", children: "Cancelar" }), _jsx(Button, { onClick: handleSave, color: "primary", variant: "contained", children: "Guardar" })] })] }));
};
export default ProductoModal;
