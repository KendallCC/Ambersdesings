
import { Producto } from "../interfaces/producto";
import { apiRequest } from "./ApiRequest";
import socket from "./socket";
/**
 * Fetch all categories from the API
 * @returns Array of products objects
 */
export const getProductos = async (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  categoriaId?: number
): Promise<{
  productos: Producto[];
  totalProductos: number;
  totalPages: number;
}> => {
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
  });

  // Agregar categoriaId a los parámetros de la consulta si está definido
  if (categoriaId) {
    query.append("categoriaId", categoriaId.toString());
  }

  return apiRequest<{
    productos: Producto[];
    totalProductos: number;
    totalPages: number;
  }>(`/productos?${query.toString()}`);
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
  codigo?: string
): Promise<Producto> => {
  return apiRequest<Producto>("/productos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, descripcion, precio, codigo, imagenes, categorias, socketId: socket.id }),
  });
};

/**
 * Obtener productos paginados desde la API
 * @param page - Número de la página a solicitar
 * @param limit - Número de productos por página
 * @returns Objetos paginados: productos, totalProductos y totalPages
 */
export const getProductosPaginados = async (
  page: number,
  limit: number = 8
): Promise<{
  productos: Producto[];
  totalProductos: number;
  totalPages: number;
}> => {
  return apiRequest<{
    productos: Producto[];
    totalProductos: number;
    totalPages: number;
  }>(`/productos/paginados?page=${page}&limit=${limit}`);
};


export const getProductosPorCategoriaPaginados = async (
  categoriaId: string,
  page: number,
  limit: number = 8
): Promise<{
  productos: Producto[];
  totalProductos: number;
  totalPages: number;
}> => {
  return apiRequest<{
    productos: Producto[];
    totalProductos: number;
    totalPages: number;
  }>(`/productos/categoria/${categoriaId}/paginados?page=${page}&limit=${limit}`);
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, socketId: socket.id }),
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ socketId: socket.id }),
  });
};