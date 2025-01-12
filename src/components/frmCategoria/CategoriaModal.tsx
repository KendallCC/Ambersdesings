import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

interface CategoriaModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  nombre: string;
  descripcion: string;
  setNombre: (value: string) => void;
  setDescripcion: (value: string) => void;
  isEditing: boolean;
}

const CategoriaModal: React.FC<CategoriaModalProps> = ({
  open,
  onClose,
  onSave,
  nombre,
  descripcion,
  setNombre,
  setDescripcion,
  isEditing,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEditing ? "Editar Categoría" : "Agregar Categoría"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre"
          fullWidth
          margin="dense"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          label="Descripción"
          fullWidth
          margin="dense"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onSave} color="primary" variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoriaModal;
