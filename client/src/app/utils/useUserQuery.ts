import { useQuery } from '@tanstack/react-query';

interface User {
  id?: string,
  username?: string,
}

const fetchUser = async (): Promise<User | null> => {
  const res = await fetch('http://localhost:4000/getData', {
    credentials: 'include',
  });
  if (!res.ok) {
    return null; // Retornar null si no está autenticado
  }
  return res.json();
};

export const useUser = () => {
  return useQuery<User | null, Error>({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false, // No refetch al volver a la ventana
  });
};
