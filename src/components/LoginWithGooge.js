import React, { useEffect } from 'react'
import styles from '../styles/Username.module.css'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
export default function LoginWithGooge({ ProfileSetter, UserSetter, UserGetter }) {
	// google auth data
	const login = useGoogleLogin({
		onSuccess: (codeResponse) => UserSetter(codeResponse),
		onError: (error) => console.log('Login Failed:', error),
	})

	useEffect(() => {
		if (UserGetter!=null && UserGetter.length !=0) {
			axios
				.get(
					`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${UserGetter.access_token}`,
					{
						headers: {
							Authorization: `Bearer ${UserGetter.access_token}`,
							Accept: 'application/json',
						},
					}
				)
				.then((res) => {
					ProfileSetter(res.data)
				})
				.catch((err) => console.log(err))
		}
	}, [UserGetter])

	return (
		<>
			<div className="text-center py-4">
				<button onClick={() => login()} className={styles.btn}>
					Signup With Google
				</button>
			</div>
		</>
	)
}
