import { useState, useEffect } from 'react';

type UseFetchReturnType<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
};

interface FetchProps {
  url: string;
  method?: 'GET' | 'POST';
  body?: object | null;
}

const useFetch = <T>(props: FetchProps): UseFetchReturnType<T> => {
  const { url, method = 'GET', body = null } = props;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result: T = await response.json();
        setData(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { data, error, isLoading };
};

export default useFetch;
