import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { registerValidation } from '../helper/validate'
import convertToBase64 from '../helper/convert'
import { registerUser } from '../helper/helper'
import styles from '../styles/Username.module.css'
import LoginWithGooge from './LoginWithGooge'
import { googleLogout } from '@react-oauth/google'
export default function Register() {
	// googleLogin Data
	const [profile, setProfile] = useState(null)
	const [user, setUser] = useState(null)

	// googlelgout on reload/load first time
	useEffect(() => {
		googleLogout()
		setUser(null)
		setProfile(null)
	}, [])

	const navigate = useNavigate()
	const [file, setFile] = useState()
	// const [accountType, setaccountType] = useState('builder')
	const formik = useFormik({
		initialValues: {
			// accountType: accountType,
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			mobile: '',
			// address: '',
		},
		validate: registerValidation,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			console.log(values)
			values = await Object.assign(values, { profile: file || '' })
			let registerPromise = registerUser(values)
			toast.promise(registerPromise, {
				loading: 'Creating...',
				success: <b>Register Successfully...!</b>,
				error: <b>Could not Register.</b>,
			})

			registerPromise.then(function () {
				navigate('/login')
			})
		},
	})
	useEffect(() => {
		console.log(profile ? profile : '')
		formik.setFieldValue('firstName',profile?.given_name)
		formik.setFieldValue('lastName',profile?.family_name)
		formik.setFieldValue('email',profile?.email)
		setFile(profile?.picture)
	}, [profile])
	/** formik doensn't support file upload so we need to create this handler */
	const onUpload = async (e) => {
		const base64 = await convertToBase64(e.target.files[0])
		setFile(base64)
	}

	// const onChangeAccountType = async (e) => {
	// 	setaccountType(e.target.value)
	// 	console.log(e.target.value)
	// }

	return (
		<div className="container mx-auto">
			<Toaster position="top-right" reverseOrder={false}></Toaster>
			<div className="flex justify-center items-center h-screen">
				<div
					className={styles.glass}
					style={{ width: '45%', paddingTop: '3em' }}
				>
					<div className="title flex flex-col items-center">
						<h4 className="text-5xl font-bold">Register</h4>
						<span className="py-4 text-xl w-2/3 text-center text-gray-500">
							Happy to join you!
						</span>
					</div>

					<form className="py-1" onSubmit={formik.handleSubmit}>
						<div className="profile flex justify-center py-4">
							<label htmlFor="profile">
								<img
									src={file || avatar}
									className={styles.profile_img}
									alt="avatar"
								/>
							</label>

							<input
								onChange={onUpload}
								type="file"
								id="profile"
								name="profile"
							/>
						</div>

						<div className="textbox flex flex-col items-center gap-6">
							{/* <div className={styles.radio}>
								<input
									id="bordered-radio-1"
									type="radio"
									value="builder"
									checked={accountType === 'builder'}
									className={styles.radio_btn}
									onChange={onChangeAccountType}
								/>
								<label
									for="bordered-radio-1"
									className={styles.radio_label}
								>
									Builder
								</label>
							</div>
							<div className={styles.radio}>
								<input
									id="bordered-radio-2"
									type="radio"
									value="recruiter"
									checked={accountType === 'recruiter'}
									className={styles.radio_btn}
									onChange={onChangeAccountType}
								/>
								<label
									for="bordered-radio-2"
									className={styles.radio_label}
								>
									Recruiter
								</label>
							</div> */}

							<input
								{...formik.getFieldProps('firstName')}
								value={formik.values.firstName}
								className={styles.textbox}
								type="text"
								placeholder="First Name"
							/>
							<input
								{...formik.getFieldProps('lastName')}
								className={styles.textbox}
								type="text"
								placeholder="Last Name"
							/>
							{/* <input
								{...formik.getFieldProps('address')}
								className={styles.textbox}
								type="text"
								placeholder="Address"
							/> */}
							<input
								{...formik.getFieldProps('mobile')}
								className={styles.textbox}
								type="text"
								placeholder="Phone No."
							/>
							<input
								{...formik.getFieldProps('email')}
								className={styles.textbox}
								type="text"
								placeholder="Email*"
							/>
							<input
								{...formik.getFieldProps('password')}
								className={styles.textbox}
								type="text"
								placeholder="Password*"
							/>
							<button className={styles.btn} type="submit">
								Register
							</button>
						</div>
					</form>
					<div className="text-center py-4">
						<span className="text-gray-500">or</span>
					</div>
					<LoginWithGooge
						ProfileSetter={setProfile}
						UserSetter={setUser}
						UserGetter={user}
					/>
					<div className="text-center py-4">
						<span className="text-gray-500">
							Already Register?{' '}
							<Link className="text-red-500" to="/login">
								Login Now
							</Link>
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
