var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { apiRequest } from "./ApiRequest";
/**
 * Fetch all categories from the API
 * @returns Array of products objects
 */
export const getProductos = () => __awaiter(void 0, void 0, void 0, function* () {
    return apiRequest('/productos');
});
/**
 * Obtener un producto por ID desde la API
 * @param id - ID del producto
 * @returns Objeto Producto
 */
export const getProductoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return apiRequest(`/productos/${id}`);
});
/**
 * Crear un nuevo producto en la API
 * @param nombre - Nombre del producto
 * @param descripcion - Descripción del producto
 * @param precio - Precio del producto
 * @param imagenes - Array de imágenes del producto
 * @param categorias - Array de IDs de categorías asociadas
 * @returns El objeto Producto creado
 */
export const createProducto = (nombre, descripcion, precio, imagenes, categorias) => __awaiter(void 0, void 0, void 0, function* () {
    return apiRequest("/productos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, descripcion, precio, imagenes, categorias }),
    });
});
/**
 * Obtener productos por categoría desde la API
 * @param categoriaId - ID de la categoría
 * @returns Array de objetos Producto
 */
export const getProductosPorCategoria = (categoriaId) => __awaiter(void 0, void 0, void 0, function* () {
    return apiRequest(`/productos/categoria/${categoriaId}`);
});
/**
 * Actualizar un producto existente en la API
 * @param id - ID del producto
 * @param data - Datos actualizados del producto
 * @returns El producto actualizado
 */
export const updateProducto = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return apiRequest(`/productos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
});
/**
 * Eliminar un producto existente en la API
 * @param id - ID del producto
 * @returns Mensaje de éxito o error
 */
export const deleteProducto = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return apiRequest(`/productos/${id}`, {
        method: "DELETE",
    });
});
