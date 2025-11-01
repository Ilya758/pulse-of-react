import { useEffect, useState } from 'react';

export const useFetch = <T>(url: string, options = {}) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: required to fetch data
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { ...options, signal });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = (await response.json()) as T;

        if (!signal.aborted) {
          setData(result);
        }
      } catch (err: unknown) {
        if (!signal.aborted && err instanceof Error) {
          setError(err.message || 'An error occurred');
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (url) {
      fetchData().catch(() => {
        throw new Error('Failed to fetch data');
      });
    } else {
      setLoading(false);
      setData(null);
    }

    return () => {
      controller.abort();
    };
  }, [url, JSON.stringify(options)]);

  return { data, error, loading };
};
