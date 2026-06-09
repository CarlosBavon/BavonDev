import { useState, useEffect } from 'react';
import api from '../utils/api';

const useGithubStats = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/api/github')
            .then(res => setData(res.data.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    return { data, loading };
};

export default useGithubStats;