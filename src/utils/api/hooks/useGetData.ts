import { useQuery, QueryKey } from '@tanstack/react-query';
import { api } from '../axios.config';

const getData = async <T>(url: string): Promise<T> => {
    const { data } = await api.get<T>(url);
    // console.log('capture getData==>', url, data);
    return data;
}

/**
 * Hook genérico para obtener data de la API
 * @param url URL del endpoint
 * @param queryKey Clave para la cache de react-query
 * @param cache Tiempo de expiración de la cache (por defecto 24 horas), en minutos
 */
export const useGetData = <T>(url: string, queryKey: QueryKey, cache: number = 60 * 24) => {
    const staleTime = 1000 * 60 * cache;
    return useQuery<T, Error>({
        queryKey,
        queryFn: () => getData<T>(url),
        staleTime,
        select: (data) => data ?? [] as T, // Evita problemas con undefined o null
    });
};
