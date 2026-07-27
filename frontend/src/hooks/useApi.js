import { useState, useCallback } from "react";

export function useApi(apiFunc) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (...args) => {
        try {
            setLoading(true);
            const res = await apiFunc(...args);
            setData(res.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [apiFunc]);

    return { data, loading, error, request };
}