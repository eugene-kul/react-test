import {
	AuthActionEnum,
	SetAuthAction,
	SetErrorAction,
	SetErrorsAction,
	SetForgotSuccessAction,
	SetForgotMsgSuccessAction,
	SetLoadingAction,
	SetRememberAction,
	SetUserAction,
	SetPhoneAction,
	SetPasswordAction,
	SetFirstNameAction,
	SetLastNameAction,
	SetCodeAction,
	SetPhoneErrorAction,
	SetPasswordErrorAction,
	SetFirstNameErrorAction,
	SetLastNameErrorAction,
	SetCodeErrorAction,
	SetTokenAction,
	SetResponseAction,
} from "./types";
import {AppDispatch} from "../../store";
import axios from "axios";
import {IErrors, IResponse, IUser} from "../../../models/Interfaces";
import {setErrorsFromResponse} from "./setErrorsFromResponse";
import {forgotStartAPI, forgotEndAPI, getUserDataAPI, loginUserAPI, regUserAPI} from "./getUserData";

export const AuthActionCreators = {
	setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
	setForgotSuccess: (forgotSuccess: boolean): SetForgotSuccessAction => ({type: AuthActionEnum.SET_FORGOT_SUCCESS, payload: forgotSuccess}),
	setResponse: (response: IResponse): SetResponseAction => ({type: AuthActionEnum.SET_RESPONSE, payload: response}),
	setForgotMsg: (forgotMsg: string): SetForgotMsgSuccessAction => ({type: AuthActionEnum.SET_FORGOT_MSG, payload: forgotMsg}),
	setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
	setLoading: (loading: boolean): SetLoadingAction => ({type: AuthActionEnum.SET_LOADING, payload: loading}),
	setRemember: (remember: boolean): SetRememberAction => ({type: AuthActionEnum.SET_REMEMBER, payload: remember}),
	setToken: (token:string): SetTokenAction => ({type: AuthActionEnum.SET_TOKEN, payload: token}),
	setPhone: (phone:string): SetPhoneAction => ({type: AuthActionEnum.SET_PHONE, payload: phone}),
	setPassword: (password:string): SetPasswordAction => ({type: AuthActionEnum.SET_PASSWORD, payload: password}),
	setFirstName: (firstName:string): SetFirstNameAction => ({type: AuthActionEnum.SET_FIRST_NAME, payload: firstName}),
	setLastName: (lastName:string): SetLastNameAction => ({type: AuthActionEnum.SET_LAST_NAME, payload: lastName}),
	setCode: (code:string): SetCodeAction => ({type: AuthActionEnum.SET_CODE, payload: code}),
	setError: (error: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: error}),
	setErrors: (errors: IErrors[]): SetErrorsAction => ({type: AuthActionEnum.SET_ERRORS, payload: errors}),
	setPhoneError: (phone:string): SetPhoneErrorAction => ({type: AuthActionEnum.SET_PHONE_ERROR, payload: phone}),
	setPasswordError: (password:string): SetPasswordErrorAction => ({type: AuthActionEnum.SET_PASSWORD_ERROR, payload: password}),
	setLastNameError: (last_name:string): SetLastNameErrorAction => ({type: AuthActionEnum.SET_LAST_NAME_ERROR, payload: last_name}),
	setFirstNameError: (first_name:string): SetFirstNameErrorAction => ({type: AuthActionEnum.SET_FIRST_NAME_ERROR, payload: first_name}),
	setCodeError: (code:string): SetCodeErrorAction => ({type: AuthActionEnum.SET_CODE_ERROR, payload: code}),
	
	clearInputErrors: () => (dispatch: AppDispatch) => {
		dispatch(AuthActionCreators.setPhoneError(''))
		dispatch(AuthActionCreators.setPasswordError(''))
		dispatch(AuthActionCreators.setFirstNameError(''))
		dispatch(AuthActionCreators.setLastNameError(''))
		dispatch(AuthActionCreators.setCodeError(''))
		dispatch(AuthActionCreators.setErrors([] as IErrors[]))
	},
	clearData: () => (dispatch: AppDispatch) => {
		dispatch(AuthActionCreators.setPhone(''))
		dispatch(AuthActionCreators.setPassword(''))
		dispatch(AuthActionCreators.setFirstName(''))
		dispatch(AuthActionCreators.setLastName(''))
		dispatch(AuthActionCreators.setCode(''))
	},
	
	login: (data: {}, isRemember:boolean) => async (dispatch: AppDispatch) => {
		dispatch(AuthActionCreators.setLoading(true))
		try {
			await loginUserAPI(data).then(
				result => {
					const token:string = result.data.token || ''
					
					if(token) {
						dispatch(AuthActionCreators.setToken(token))
						
						getUserDataAPI(token).then(
							result => {
								dispatch(AuthActionCreators.setUser(result.data))
								dispatch(AuthActionCreators.setIsAuth(true))
								dispatch(AuthActionCreators.setLoading(false))
								isRemember && localStorage.setItem("token", token);
							}
						)
					}
				}
			)
		} catch (error:any) {
			dispatch(AuthActionCreators.setLoading(false))
			axios.isAxiosError(error)
				? setErrorsFromResponse(error,dispatch)
				: console.error(error)
		}
	},
	logout: () => (dispatch: AppDispatch) => {
		localStorage.removeItem("token");
		localStorage.removeItem("auth");
		
		dispatch(AuthActionCreators.setUser({} as IUser))
		dispatch(AuthActionCreators.setResponse({} as IResponse))
		dispatch(AuthActionCreators.setToken(''))
		dispatch(AuthActionCreators.setForgotSuccess(false))
		dispatch(AuthActionCreators.setForgotMsg(''))
		dispatch(AuthActionCreators.setIsAuth(false))
	},
	reg: (data: {}) => async (dispatch: AppDispatch) => {
		dispatch(AuthActionCreators.setLoading(true))
		try {
			await regUserAPI(data).then(
				result => {
					dispatch(AuthActionCreators.setIsAuth(true))
					dispatch(AuthActionCreators.setResponse(result.data))
					dispatch(AuthActionCreators.setLoading(false))
				}
			)
		} catch (error:any) {
			dispatch(AuthActionCreators.setLoading(false))
			axios.isAxiosError(error)
				? setErrorsFromResponse(error,dispatch)
				: console.error(error)
		}
	},
	forgot: (data: {}) => async (dispatch: AppDispatch) => {
		dispatch(AuthActionCreators.setLoading(true))
		try {
			await forgotStartAPI(data).then(
				result => {
					dispatch(AuthActionCreators.setForgotSuccess(result.data.success||false))
					dispatch(AuthActionCreators.setForgotMsg(result.data.message||''))
					dispatch(AuthActionCreators.setLoading(false))
				}
			)
		} catch (error:any) {
			dispatch(AuthActionCreators.setLoading(false))
			axios.isAxiosError(error)
				? setErrorsFromResponse(error,dispatch)
				: console.error(error);
		}
	},
	forgotEnd: (data: {}) => async (dispatch: AppDispatch) => {
		dispatch(AuthActionCreators.setLoading(true))
		try {
			await forgotEndAPI(data).then(
				result => {
					dispatch(AuthActionCreators.setResponse(result.data))
					dispatch(AuthActionCreators.setIsAuth(true))
					dispatch(AuthActionCreators.setLoading(false))
				}
			)
		} catch (error:any) {
			dispatch(AuthActionCreators.setLoading(false))
			axios.isAxiosError(error)
				? setErrorsFromResponse(error,dispatch)
				: console.error(error)
		}
	},
}
