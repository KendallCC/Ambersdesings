import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Checkbox,
  ListItemText,
  Select,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Categoria } from "../../interfaces/Categoria";
import { Imagen } from "../../interfaces/Imagen";
import { getCategorias } from "../../Services/categoriaService";

interface ProductoModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    nombre: string;
    descripcion: string;
    precio: number;
    codigo: string;
    imagenes: { urlImagen: string }[];
    categorias: { categoriaId: number }[];
  }) => void;
  producto?: {
    id?: number;
    nombre: string;
    descripcion?: string;
    precio: number;
    codigo?: string;
    imagenes: { id: number; urlImagen: string; productoId: number }[];
    categorias: { categoriaId: number }[];
  } | null;
}

const ProductoModal: React.FC<ProductoModalProps> = ({
  open,
  onClose,
  onSave,
  producto,
}) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [codigo, setCodigo] = useState("");
  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<number[]>(
    []
  );
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [errors, setErrors] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    codigo: "",
    imagenes: "",
    categorias: "",
  });

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre || "");
      setDescripcion(producto.descripcion || "");
      setPrecio(producto.precio ? producto.precio.toString() : "");
      setCodigo(producto.codigo || "");
      setImagenes(producto.imagenes || []);
      setCategoriasSeleccionadas(
        producto.categorias.map((categoria) => categoria.categoriaId) || []
      );
    } else {
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
      codigo: codigo.trim()
        ? ""
        : "El código es obligatorio.",
      imagenes:
        imagenes.some((img) => img.urlImagen.trim())
          ? ""
          : "Debe agregar al menos una imagen válida.",
      categorias:
        categoriasSeleccionadas.length > 0
          ? ""
          : "Debe seleccionar al menos una categoría.",
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleAddImagen = () => {
    setImagenes([...imagenes, { id: 0, urlImagen: "", productoId: 0 }]);
  };

  const handleImagenChange = (index: number, url: string) => {
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
        codigo: codigo.trim() || "sin codigo",
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{producto ? "Editar Producto" : "Agregar Producto"}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            label="Nombre"
            variant="outlined"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            error={!!errors.nombre}
            helperText={errors.nombre}
          />
          <TextField
            label="Descripción"
            variant="outlined"
            multiline
            rows={3}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            error={!!errors.descripcion}
            helperText={errors.descripcion}
          />
          <TextField
            label="Precio"
            variant="outlined"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            error={!!errors.precio}
            helperText={errors.precio}
          />
          <TextField
            label="Código (opcional)"
            variant="outlined"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            error={!!errors.codigo}
            helperText={errors.codigo}
          />
          <FormControl error={!!errors.categorias}>
            <InputLabel id="categorias-label">Categorías</InputLabel>
            <Select
              labelId="categorias-label"
              multiple
              value={categoriasSeleccionadas}
              onChange={(e) =>
                setCategoriasSeleccionadas(
                  typeof e.target.value === "string"
                    ? e.target.value.split(",").map(Number)
                    : e.target.value
                )
              }
              input={<OutlinedInput label="Categorías" />}
              renderValue={(selected) =>
                categorias
                  .filter((cat) => selected.includes(cat.id))
                  .map((cat) => cat.nombre)
                  .join(", ")
              }
            >
              {categorias.map((categoria) => (
                <MenuItem key={categoria.id} value={categoria.id}>
                  <Checkbox
                    checked={categoriasSeleccionadas.includes(categoria.id)}
                  />
                  <ListItemText primary={categoria.nombre} />
                </MenuItem>
              ))}
            </Select>
            {errors.categorias && <Box sx={{ color: "error.main", mt: 1 }}>{errors.categorias}</Box>}
          </FormControl>
          {imagenes.map((imagen, index) => (
            <TextField
              key={index}
              label={`URL de Imagen ${index + 1}`}
              variant="outlined"
              value={imagen.urlImagen}
              onChange={(e) => handleImagenChange(index, e.target.value)}
              error={!!errors.imagenes}
            />
          ))}
          <Button onClick={handleAddImagen}>Agregar Imagen</Button>
          {errors.imagenes && <Box sx={{ color: "error.main" }}>{errors.imagenes}</Box>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductoModal;
