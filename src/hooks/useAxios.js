import React, { useContext, useMemo } from 'react';
import axios from 'axios';
import { selectAccessToken, selectRefreshToken } from './useAuthorisation';
import { useRouter } from 'next/router';
import { URI_BASE } from '../constants';
import jwtDecode from 'jwt-decode';

// https://github.com/Godofbrowser/axios-refresh-multiple-request

const AxiosContext = React.createContext({});

export const saveCredentialsFromResponse = ({ accessToken, refreshToken }) => {
	localStorage.setItem('accessToken', accessToken);
	localStorage.setItem('refreshToken', refreshToken);

	const tokenAccessPayload = jwtDecode(accessToken);
	const tokenRefreshPayload = jwtDecode(refreshToken);

	localStorage.setItem('accessTokenExpirationTime', tokenAccessPayload?.exp * 1000);
	localStorage.setItem('refreshTokenExpirationTime', tokenRefreshPayload?.exp * 1000);
};

export const removeCredentials = () => {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
	localStorage.removeItem('accessTokenExpirationTime');
	localStorage.removeItem('refreshTokenExpirationTime');
};

export const AxiosProvider = ({ children }) => {
	const router = useRouter();

	const axiosClients = useMemo(() => {
		let queue = [];
		let isRefetching = false;

		const axiosUnAuth = axios.create({
			baseURL: URI_BASE,
		});

		const axiosAuth = axios.create({
			baseURL: URI_BASE,
		});

		// try to get new token
		axiosAuth.interceptors.response.use(undefined, (error) => {
			const originalRequest = error.config;

			// We have a 401 response
			if (error?.response?.status === 401) {
				// And we need to wait for token refetch
				if (isRefetching) {
					// Barrier that will be removed by token refetcher
					return new Promise((res, rej) => {
						queue.push({ res, rej });
					})
						.then(() => axiosAuth(originalRequest))
						.catch((err) => Promise.reject(err));
				}

				// And we are first - take responsibility for refresh token
				isRefetching = true;

				return new Promise((res, rej) => {
					const token = selectRefreshToken();

					axiosUnAuth('/auth-service/refresh', {
						method: 'POST',
						baseURL: URI_BASE,
						headers: { Authorization: `Bearer ${token}` },
						data: {
							token,
						},
					})
						.then((data) => {
							saveCredentialsFromResponse(data?.data?.payload);
							queue.forEach((item) => item.res());
							return axiosAuth(originalRequest).then((data) => res(data));
						})
						.catch((err) => {
							router.push(`/?callback=${window.location.pathname}`);
							queue.forEach((item) => item.rej(err));
							return rej(err);
						})
						.finally(() => {
							queue = [];
							isRefetching = false;
						});
				});
			}

			return Promise.reject(error);
		});

		// add token to request
		axiosAuth.interceptors.request.use(async (config) => {
			const token = selectAccessToken();
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}

			return config;
		});

		return {
			axiosAuth,
			axiosUnAuth,
		};
	}, []);

	return <AxiosContext.Provider value={axiosClients}>{children}</AxiosContext.Provider>;
};

export const useAxios = () => useContext(AxiosContext);
