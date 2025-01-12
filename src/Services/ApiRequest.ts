const BASE_URL = import.meta.env.VITE_BASE_URL;
/**
 * Generic function to make API requests
 * @param endpoint - API endpoint
 * @param options - Fetch options (method, headers, body, etc.)
 * @returns Parsed JSON response
 */
export const apiRequest = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, options);
  
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error(`API Request Failed: ${error}`);
      throw error;
    }
  };