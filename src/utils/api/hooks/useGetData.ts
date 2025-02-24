import { useQuery, QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { api } from '../axios.config';

const getData = async <T>(url: string): Promise<T> => {
    const { data } = await api.get<T>(url);
    return data;
}

interface UseGetDataOptions<T> extends Partial<UseQueryOptions<T, Error, T>> {
    cache?: number;
    refetchOnWindowFocus?: boolean;
    refetchOnMount?: boolean;
}

/**
 * Hook genérico para obtener data de la API
 * @param url URL del endpoint
 * @param queryKey Clave para la cache de react-query
 * @param options Opciones adicionales de configuración
 */
export const useGetData = <T>(
    url: string, 
    queryKey: QueryKey, 
    options: UseGetDataOptions<T> = {}
) => {
    const { 
        cache = 60 * 24,
        refetchOnWindowFocus = false,
        refetchOnMount = false,
        ...restOptions 
    } = options;

    const staleTime = 1000 * 60 * cache;

    return useQuery<T, Error>({
        queryKey,
        queryFn: () => getData<T>(url),
        staleTime,
        refetchOnWindowFocus,
        refetchOnMount,
        select: (data) => data ?? [] as T,
        ...restOptions
    });
};