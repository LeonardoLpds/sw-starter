import { useAppContext } from '../contexts/AppContext';

const baseUrl = 'http://localhost:8000/api';

export default function useApi() {
  const { isLoading, setIsLoading } = useAppContext();

  const request = async (path, method = 'GET', body) => {
    setIsLoading(true);
    return fetch(`${baseUrl}/${path}`, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .finally(() => setIsLoading(false));
  };

  return [request, isLoading];
}
