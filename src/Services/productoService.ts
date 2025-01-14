import { Categoria } from "../interfaces/Categoria";
import { Producto } from "../interfaces/producto";
import { apiRequest } from "./ApiRequest";

/**
 * Fetch all categories from the API
 * @returns Array of products objects
 */
export const getProductos = async (): Promise<Producto[]> => {
  return apiRequest<Producto[]>('/productos');
};



/**
 * Obtener un producto por ID desde la API
 * @param id - ID del producto
 * @returns Objeto Producto
 */
export const getProductoById = async (id: number): Promise<Producto> => {
  return apiRequest<Producto>(`/productos/${id}`);
};


/**
 * Crear un nuevo producto en la API
 * @param nombre - Nombre del producto
 * @param descripcion - Descripción del producto
 * @param precio - Precio del producto
 * @param codigo - Código del producto (opcional)
 * @param imagenes - Array de imágenes del producto
 * @param categorias - Array de IDs de categorías asociadas
 * @returns El objeto Producto creado
 */
export const createProducto = async (
  nombre: string,
  descripcion: string,
  precio: number,
  imagenes: { urlImagen: string }[],
  categorias: { categoriaId: number }[],
  codigo?: string,
): Promise<Producto> => {
  console.log(codigo);
  
  return apiRequest<Producto>("/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre, descripcion, precio, codigo, imagenes, categorias }),
  });
};


/**
 * Obtener productos por categoría desde la API
 * @param categoriaId - ID de la categoría
 * @returns Array de objetos Producto
 */
export const getProductosPorCategoria = async (
  categoriaId: number
): Promise<Producto[]> => {
  return apiRequest<Producto[]>(`/productos/categoria/${categoriaId}`);
};

/**
 * Actualizar un producto existente en la API
 * @param id - ID del producto
 * @param data - Datos actualizados del producto
 * @returns El producto actualizado
 */
export const updateProducto = async (
  id: number,
  data: {
    nombre: string;
    descripcion: string;
    precio: number;
    imagenes: { urlImagen: string }[];
    categorias: { categoriaId: number }[];
  }
): Promise<Producto> => {
  return apiRequest<Producto>(`/productos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};


/**
 * Eliminar un producto existente en la API
 * @param id - ID del producto
 * @returns Mensaje de éxito o error
 */
export const deleteProducto = async (id: number): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>(`/productos/${id}`, {
    method: "DELETE",
  });
};