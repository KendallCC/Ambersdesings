import { Categoria } from '../interfaces/Categoria';
import { apiRequest } from './ApiRequest';

/**
 * Fetch all categories from the API
 * @returns Array of Categoria objects
 */
export const getCategorias = async (): Promise<Categoria[]> => {
    return await apiRequest<Categoria[]>('/categorias', {
      method: 'GET',
    });
  };

/**
 * Create a new category in the API
 * @param nombre - Category name
 * @param descripcion - Category description
 * @returns The created Categoria object
 */
export const createCategoria = async (
  nombre: string,
  descripcion: string
): Promise<Categoria> => {
  return apiRequest<Categoria>('/categorias', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre, descripcion }),
  });
};



/**
 * Update an existing category in the API
 * @param id - ID of the category to update
 * @param nombre - Updated category name
 * @param descripcion - Updated category description
 * @returns The updated Categoria object
 */
export const updateCategoria = async (
    id: number,
    nombre: string,
    descripcion: string
  ): Promise<Categoria> => {
    return apiRequest<Categoria>(`/categorias/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, descripcion }),
    });
  };

  /**
 * Delete a category in the API
 * @param id - ID of the category to delete
 */
export const deleteCategoria = async (id: number): Promise<void> => {
    await apiRequest<void>(`/categorias/${id}`, {
      method: "DELETE",
    });
  };