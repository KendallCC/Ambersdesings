
export interface Imagen {
    id: number;
    urlImagen: string;
    productoId: number;
  }
  
  export interface CategoriaRelacion {
    productoId: number;
    categoriaId: number;
    categoria: {
      id: number;
      nombre: string;
      descripcion?: string;
    };
  }
  
  export interface Producto {
    id: number;
    nombre: string;
    descripcion?: string;
    codigo?:string;
    precio: number;
    imagenes: Imagen[];
    categorias: CategoriaRelacion[];
  }
  