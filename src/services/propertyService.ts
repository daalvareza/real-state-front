import { Filters } from "../utilities/interfaces";

const BASE_URL = 'http://localhost:5025/api';

export const searchProperties = async (filters : Filters, page = 1, pageSize = 6) => {
  const endpoint = new URL(`${BASE_URL}/property`);
    
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        endpoint.searchParams.append(key, String(value));
      }
    });
  }
  endpoint.searchParams.append('page', String(page));
  endpoint.searchParams.append('pageSize', String(pageSize));
  const response = await fetch(endpoint.toString());
  if (!response.ok) {
    throw new Error('Failed to fetch properties');
  }
  return response.json();
};
