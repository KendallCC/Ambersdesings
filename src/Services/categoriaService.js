var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { apiRequest } from './ApiRequest';
/**
 * Fetch all categories from the API
 * @returns Array of Categoria objects
 */
export const getCategorias = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield apiRequest('/categorias', {
        method: 'GET',
    });
});
/**
 * Create a new category in the API
 * @param nombre - Category name
 * @param descripcion - Category description
 * @returns The created Categoria object
 */
export const createCategoria = (nombre, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    return apiRequest('/categorias', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, descripcion }),
    });
});
/**
 * Update an existing category in the API
 * @param id - ID of the category to update
 * @param nombre - Updated category name
 * @param descripcion - Updated category description
 * @returns The updated Categoria object
 */
export const updateCategoria = (id, nombre, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    return apiRequest(`/categorias/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, descripcion }),
    });
});
/**
* Delete a category in the API
* @param id - ID of the category to delete
*/
export const deleteCategoria = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield apiRequest(`/categorias/${id}`, {
        method: "DELETE",
    });
});
