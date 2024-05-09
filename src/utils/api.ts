// api.ts

import {useMutation, UseMutationResult } from 'react-query';
import { FormData, MonthlySales } from '../interfaces/interfaces';

// Define your API endpoints
const API_ENDPOINT = 'https://fastapi-simulation-franchise.vercel.app/';
// const API_ENDPOINT = 'http://127.0.0.1:8000/';


interface MonthlySalesArr extends Array<MonthlySales>{}

// Define types for your API responses and request data
interface MonthlySalesApiResponse {
  // Your API response structure
    is_vp:boolean,
    monthly_sales:MonthlySalesArr,
    total_expenses:number,
    total_investment:number
    total_revenue:number
    total_cum_profit:number
}

interface ApiError {
  // Your API error structure
  message: string;
}


// Define your API functions
// export const fetchData = async (): Promise<MonthlySalesApiResponse> => {
//   const response = await fetch(API_ENDPOINT);
//   if (!response.ok) {
//     throw new Error('Failed to fetch data');
//   }
//   return response.json();
// };

export const postData = async (requestData: FormData): Promise<MonthlySalesApiResponse> => {
  const response = await fetch(`${API_ENDPOINT}count-sales/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error('Failed to post data');
  }

  return response.json();
};

// // React Query hooks for your API functions
// export const useFetchData = (): UseQueryResult<ApiResponse, ApiError> => {
//   return useQuery('fetchData', fetchData);
// };

export const usePostData = (): UseMutationResult<MonthlySalesApiResponse, ApiError, FormData> => {
  return useMutation(postData);
};
