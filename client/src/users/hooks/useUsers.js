import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../providers/UserProvider";
import useAxios from "../../cards/hooks/useAxios";
import { getUsersApi, login, signup, updateUser } from "../services/usersApiService";
import { removeToken, setTokenInLocalStorage ,getUser} from "../services/localStorageService";
import ROUTES from "../../routes/routesModel";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { useSnackbar } from "../../providers/SnackbarProvider";

const useUsers = () => {
   
    const [users, setUsers] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const { user, setUser, setToken } = useUser();

    const snack = useSnackbar();

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
        navigate(ROUTES.CARDS);
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
            const users = await getUsersApi();
            requestStatus(false, null, users);
            return users;
        } catch (error) {
            requestStatus(false, error, null);
        }
    }

    
    const handleGetUser = async (id) => {
        try {
            isLoading(true);
            const user = await getUser(id);
            requestStatus(false, null, null, user);
            return user;
        } catch (error) {
            requestStatus(false, error, null);
        }
    }

    const handleEditUser = useCallback(
        async (id, userFormClient) => {
          try {
            await updateUser(id, userFormClient);
            snack("you update the user successfully", "success");
            navigate(ROUTES.CARDS);
          } catch (error) {
            requestStatus(false, error, null);
          }
        },
        [requestStatus, navigate]
      );

   

    const value = useMemo(
        () => ({
            users, isLoading, error, user,
        }), [users, isLoading, error, user]);

    return {
        handleLogin,
        handleEditUser,
        handleLogout,
        handleSignup,
        handleGetUser,
        handleGetUsers,
        users,
        isLoading,
        error,
        user,
        value,
    }
};

export default useUsers;
