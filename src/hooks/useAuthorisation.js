import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const hasAccessToken = () => !!localStorage.getItem('accessToken');
export const hasRefreshToken = () => !!localStorage.getItem('refreshToken');
export const selectAccessToken = () => localStorage.getItem('accessToken');
export const selectRefreshToken = () => localStorage.getItem('refreshToken');
export const selectAccessTokenTime = () => localStorage.getItem('accessTokenExpirationTime');
export const selectRefreshTokenTime = () => localStorage.getItem('refreshTokenExpirationTime');
export const isAccessTokenExpired = () => +selectAccessTokenTime() < new Date().getTime() + 1000;
export const isRefreshTokenExpired = () => +selectRefreshTokenTime() < new Date().getTime() + 1000;

export const useAuthorisation = () => {
	const router = useRouter();

	useEffect(() => {
		if (hasAccessToken() && !isAccessTokenExpired()) {
			return;
		}

		if (!hasRefreshToken() || isRefreshTokenExpired()) {
			// access token is wrong, refresh token is wrong
			// redirect to signin with callback
			router.push(`/?callback=${window.location.pathname}`);
		}
	}, []);
};
