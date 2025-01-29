export interface House {
  idProperty: number;
  name: string;
  address: string;
  price: string;
  firstImage: string;
  idOwner?: string;
  ownerName?: string;
}
  
export interface Filters {
  name?: string;
  address?: string;
  minPrice?: string;
  maxPrice?: string;
}
 
export interface SearchPropertiesResponse {
  totalCount: number;
  properties: House[];
}