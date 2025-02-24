import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '../axios.config';
import { ErrorApiResponse } from '../../../types/api';

interface PostResponse {
  message: string;
  data?: unknown;
}

const postData = async <T>({
  url,
  data,
}: {
  url: string;
  data: T;
}): Promise<PostResponse> => {
  const response = await api.post<PostResponse>(url, data);
  return response.data;
};

/**
 * Hook genérico para enviar datos a la API mediante POST
 * @param url URL del endpoint
 * @param options Opciones adicionales para la mutación
 */
export const usePostData = <T>(
  url: string,
  options?: Omit<
    UseMutationOptions<PostResponse, ErrorApiResponse, T, unknown>,
    'mutationFn'
  >
) => {
  return useMutation<PostResponse, ErrorApiResponse, T>({
    mutationFn: (data: T) => postData({ url, data }),
    ...options,
  });
};