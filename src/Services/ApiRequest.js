var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = import.meta.env.VITE_BASE_URL;
/**
 * Generic function to make API requests
 * @param endpoint - API endpoint
 * @param options - Fetch options (method, headers, body, etc.)
 * @returns Parsed JSON response
 */
export const apiRequest = (endpoint, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        return yield response.json();
    }
    catch (error) {
        console.error(`API Request Failed: ${error}`);
        throw error;
    }
});
