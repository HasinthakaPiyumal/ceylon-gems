import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setUser } from '@/store/authSlice';
import { authApi } from '@/lib/api';

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    // On mount, check if we have a token but no user data
    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken && !user) {
            // Fetch user profile
            authApi.getProfile()
                .then(response => {
                    dispatch(setUser(response.data));
                })
                .catch(() => {
                    // If token is invalid, clear it
                    localStorage.removeItem('token');
                });
        }
    }, [user, dispatch]);

    return <>{children}</>;
};

export default AuthProvider;