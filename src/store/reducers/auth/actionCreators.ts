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
} from "./types";
import {AppDispatch} from "../../store";
import axios from "axios";
import {IErrors, IUser} from "../../../models/Interfaces";
import {GetErrors} from "./Errors";
import {forgotStartAPI, forgotEndAPI, getUserDataAPI, loginUserAPI, regUserAPI} from "./getUserData";

export const AuthActionCreators = {
	setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
	setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
	setLoading: (loading: boolean): SetLoadingAction => ({type: AuthActionEnum.SET_LOADING, payload: loading}),
	setRemember: (remember: boolean): SetRememberAction => ({type: AuthActionEnum.SET_REMEMBER, payload: remember}),
	setForgotSuccess: (forgotSuccess: boolean): SetForgotSuccessAction => ({type: AuthActionEnum.SET_FORGOT_SUCCESS, payload: forgotSuccess}),
	setForgotMsg: (forgotMsg: string): SetForgotMsgSuccessAction => ({type: AuthActionEnum.SET_FORGOT_MSG, payload: forgotMsg}),
	setPhone: (phone:string): SetPhoneAction => ({type: AuthActionEnum.SET_PHONE, payload: phone}),
	setPassword: (password:string): SetPasswordAction => ({type: AuthActionEnum.SET_PASSWORD, payload: password}),
	setFirstName: (firstName:string): SetFirstNameAction => ({type: AuthActionEnum.SET_FIRST_NAME, payload: firstName}),
	setLastName: (lastName:string): SetLastNameAction => ({type: AuthActionEnum.SET_LAST_NAME, payload: lastName}),
	setCode: (code:string): SetCodeAction => ({type: AuthActionEnum.SET_CODE, payload: code}),
	setPhoneError: (phone:string): SetPhoneErrorAction => ({type: AuthActionEnum.SET_PHONE_ERROR, payload: phone}),
	setPasswordError: (password:string): SetPasswordErrorAction => ({type: AuthActionEnum.SET_PASSWORD_ERROR, payload: password}),
	setFirstNameError: (first_name:string): SetFirstNameErrorAction => ({type: AuthActionEnum.SET_FIRST_NAME_ERROR, payload: first_name}),
	setLastNameError: (last_name:string): SetLastNameErrorAction => ({type: AuthActionEnum.SET_LAST_NAME_ERROR, payload: last_name}),
	setCodeError: (code:string): SetCodeErrorAction => ({type: AuthActionEnum.SET_CODE_ERROR, payload: code}),
	setError: (error: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: error}),
	setErrors: (errors: IErrors[]): SetErrorsAction => ({type: AuthActionEnum.SET_ERRORS, payload: errors}),
	
	login: (data: {}, isRemember:boolean) => async (dispatch: AppDispatch) => {
		dispatch(AuthActionCreators.setLoading(true))
		try {
			await loginUserAPI(data).then(
				result => {
					const token = result.data.token!
					if(isRemember) {
						localStorage.setItem("token", token);
						localStorage.setItem("auth", "true");
					}
					getUserDataAPI(token).then(
						result => {
							dispatch(AuthActionCreators.setUser(result.data))
							dispatch(AuthActionCreators.setIsAuth(true))
						}
					)
				}
			)
		} catch (error:any) {
			axios.isAxiosError(error)
				? GetErrors(error,dispatch)
				: console.error(error)
		}
	},
	clearErrors: () => (dispatch: AppDispatch) => {
		dispatch(AuthActionCreators.setPhoneError(''))
		dispatch(AuthActionCreators.setPasswordError(''))
		dispatch(AuthActionCreators.setFirstNameError(''))
		dispatch(AuthActionCreators.setLastNameError(''))
		dispatch(AuthActionCreators.setCodeError(''))
		dispatch(AuthActionCreators.setError(''))
		dispatch(AuthActionCreators.setErrors([] as IErrors[]))
	},
	clearData: () => (dispatch: AppDispatch) => {
		dispatch(AuthActionCreators.setPhone(''))
		dispatch(AuthActionCreators.setPassword(''))
		dispatch(AuthActionCreators.setFirstName(''))
		dispatch(AuthActionCreators.setLastName(''))
		dispatch(AuthActionCreators.setCode(''))
		dispatch(AuthActionCreators.setUser({} as IUser))
	},
	logout: () => (dispatch: AppDispatch) => {
		localStorage.removeItem("token");
		localStorage.removeItem("auth");
		
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
					dispatch(AuthActionCreators.setUser(result.data))
				}
			)
		} catch (error:any) {
			axios.isAxiosError(error)
				? GetErrors(error,dispatch)
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
				}
			)
		} catch (error:any) {
			axios.isAxiosError(error)
				? GetErrors(error,dispatch)
				: console.error(error);
		}
	},
	forgotEnd: (data: {}) => async (dispatch: AppDispatch) => {
		dispatch(AuthActionCreators.setLoading(true))
		try {
			await forgotEndAPI(data).then(
				result => {
					dispatch(AuthActionCreators.setUser(result.data))
					dispatch(AuthActionCreators.setIsAuth(true))
				}
			)
		} catch (error:any) {
			axios.isAxiosError(error)
				? GetErrors(error,dispatch)
				: console.error(error)
		}
	},
}
