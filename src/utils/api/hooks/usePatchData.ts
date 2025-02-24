import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '../axios.config';

interface PatchResponse {
  message: string;
  data?: unknown;
}

interface PatchParams<T> {
  url: string;
  id: number | string;
  data: Partial<T>;
}

const patchData = async <T>({
  url,
  id,
  data,
}: PatchParams<T>): Promise<PatchResponse> => {
  console.log('url', url);
  console.log('id', id);
  console.log('data', data);
  const response = await api.patch<PatchResponse>(`${url}/${id}`, data);
  return response.data;
};

/**
 * Hook genérico para actualizar datos en la API mediante PATCH
 * @param url URL base del endpoint (sin el ID)
 * @param options Opciones adicionales para la mutación
 */
export const usePatchData = <T>(
  options?: Omit<
    UseMutationOptions<PatchResponse, Error, PatchParams<T>, unknown>,
    'mutationFn'
  >
) => {
  return useMutation<PatchResponse, Error, PatchParams<T>>({
    mutationFn: (params) => patchData(params),
    ...options,
  });
};