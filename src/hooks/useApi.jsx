import { useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useApi = (initialConfig = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const callApi = useCallback(async (config = {}) => {
    setLoading(true);
    setError(null);

    try {
      const finalConfig = { ...initialConfig, ...config };
      const response = await axios(finalConfig);
      setData(response?.data);
      return response.data;
    } catch (err) {
      toast.error(err?.response?.data?.error||err?.response?.data?.message || err?.message || "Something went wrong !!");
    } finally {
      setLoading(false);
    }
  }, [initialConfig]);

  return { data, error, loading, callApi };

};

export default useApi;
