import {AuthAction, AuthActionEnum} from "./types";
import {IAuthState, IErrors, IResponse, IUser} from "../../../models/Interfaces";

const initialState: IAuthState = {
	response: {} as IResponse,
	errors: [] as IErrors[],
	user: {} as IUser,
	isAuth: false,
	isLoading: false,
	isRemember: true,
	forgotSuccess: false,
	first_nameError: '',
	last_nameError: '',
	passwordError: '',
	first_name: '',
	phoneError: '',
	forgotMsg: '',
	last_name: '',
	codeError: '',
	password: '',
	token: '',
	error: '',
	phone: '',
	code: '',
}

export default function authReducer(state = initialState, action: AuthAction): IAuthState {
	switch(action.type) {
		case AuthActionEnum.SET_TOKEN:
			return {...state, token: action.payload}
		case AuthActionEnum.SET_FORGOT_SUCCESS:
			return {...state, forgotSuccess: action.payload}
		case AuthActionEnum.SET_AUTH:
			return {...state, isAuth: action.payload}
		case AuthActionEnum.SET_ERROR:
			return {...state, error: action.payload}
		case AuthActionEnum.SET_ERRORS:
			return {...state, errors: action.payload}
		case AuthActionEnum.SET_USER:
			return {...state, user: action.payload}
		case AuthActionEnum.SET_LOADING:
			return {...state, isLoading: action.payload}
		case AuthActionEnum.SET_REMEMBER:
			return {...state, isRemember: action.payload}
		case AuthActionEnum.SET_FORGOT_MSG:
			return {...state, forgotMsg: action.payload}
		case AuthActionEnum.SET_PHONE:
			return {...state, phone: action.payload}
		case AuthActionEnum.SET_PASSWORD:
			return {...state, password: action.payload}
		case AuthActionEnum.SET_FIRST_NAME:
			return {...state, first_name: action.payload}
		case AuthActionEnum.SET_LAST_NAME:
			return {...state, last_name: action.payload}
		case AuthActionEnum.SET_CODE:
			return {...state, code: action.payload}
		case AuthActionEnum.SET_PHONE_ERROR:
			return {...state, phoneError: action.payload, error:''}
		case AuthActionEnum.SET_PASSWORD_ERROR:
			return {...state, passwordError: action.payload, error:''}
		case AuthActionEnum.SET_FIRST_NAME_ERROR:
			return {...state, first_nameError: action.payload, error:''}
		case AuthActionEnum.SET_LAST_NAME_ERROR:
			return {...state, last_nameError: action.payload, error:''}
		case AuthActionEnum.SET_CODE_ERROR:
			return {...state, codeError: action.payload, error:''}
		case AuthActionEnum.SET_RESPONSE:
			return {...state, response: action.payload}
		default:
			return state
	}
}