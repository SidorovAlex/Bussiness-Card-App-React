import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../providers/UserProvider";
import useAxios from "../../cards/hooks/useAxios";
import { getUserDetails, getUsersDetail, login, signup } from "../services/usersApiService";
import { getUser, removeToken, setTokenInLocalStorage } from "../services/localStorageService";
import ROUTES from "../../routes/routesModel";
import normalizeUser from "../helpers/normalization/normalizeUser";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8181';
const useUsers = () => {
    const [users, setUsers] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    const navigate = useNavigate();

    const { user, setUser, setToken } = useUser();

    useAxios();

    const requestStatus = useCallback(
        (loading, errorMessage, users, user = null) => {
            setLoading(loading);
            setError(errorMessage);
            setUsers(users);
            setUser(user);
        }, [setUser]
    );

    const handleLogin = useCallback(async (user) => {
        try {
            const token = await login(user); // token: kjh34kl5h3lk45h345.k3jh45k3j4h5.kjh345kuj3h45
            setTokenInLocalStorage(token); // localStorage: {token: kjh34kl5h3lk45h345.k3jh45k3j4h5.kjh345kuj3h45}
            setToken(token);
            const userFromLocalStorage = getUser();
            requestStatus(false, null, null, userFromLocalStorage);
            navigate(ROUTES.CARDS);
        } catch (error) {
            requestStatus(false, error, null);
        }
    }, [navigate, requestStatus]);

    const handleLogout = useCallback(() => {
        removeToken();
        setUser(null);
    }, [setUser]);

    const handleSignup = useCallback(
        async (userFromClient) => {
            try {
                const normalizedUser = normalizeUser(userFromClient);
                await signup(normalizedUser);
                await handleLogin({
                    email: userFromClient.email,
                    password: userFromClient.password,
                });
            } catch (error) {
                requestStatus(false, error, null);
            }
        }, [requestStatus, handleLogin]
    );

    const handleGetUsers = async () => {
        try {
            isLoading(true);
            const cards = await getUsersDetail();
            requestStatus(false, null, cards);
        } catch (error) {
            requestStatus(false, error, null);
        }
    }

    const getUser = async (id) => {
        try {
            const { data } = await axios.get(`${apiUrl}/user/${id}`);
            return data;
        } catch (error) {
            return Promise.reject(error.message);
        }
    }


    const handleGetuser = async (id) => {
        try {
            isLoading(true);
            const card = await getUser(id);
            requestStatus(false, null, null, card);
            return card;
        } catch (error) {
            requestStatus(false, error, null);
        }
    }

    const value = useMemo(
        () => ({
            users, isLoading, error, user,
        }), [users, isLoading, error, user]);

    return {
        handleLogin,
        handleGetUsers,
        handleGetuser,
        handleLogout,
        handleSignup,
        users,
        isLoading,
        error,
        user,
    }
};

export default useUsers;
