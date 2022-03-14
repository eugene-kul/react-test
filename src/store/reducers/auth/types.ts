import {IErrors, IResponse, IUser} from "../../../models/Interfaces";

export enum AuthActionEnum {
	SET_REMEMBER = "SET_REMEMBER",
	SET_LOADING = "SET_LOADING",
	SET_TOKEN = "SET_TOKEN",
	SET_USER = "SET_USER",
	SET_RESPONSE = "SET_RESPONSE",
	SET_PHONE = "SET_PHONE",
	SET_PASSWORD = "SET_PASSWORD",
	SET_FIRST_NAME = "SET_FIRST_NAME",
	SET_LAST_NAME = "SET_LAST_NAME",
	SET_CODE = "SET_CODE",
	SET_AUTH = "SET_AUTH",
	SET_FORGOT_SUCCESS = "SET_FORGOT_SUCCESS",
	SET_FORGOT_MSG = "SET_FORGOT_MSG",
	SET_ERROR = "SET_ERROR",
	SET_ERRORS = "SET_ERRORS",
	SET_PHONE_ERROR = "SET_PHONE_ERROR",
	SET_PASSWORD_ERROR = "SET_PASSWORD_ERROR",
	SET_FIRST_NAME_ERROR = "SET_FIRST_NAME_ERROR",
	SET_LAST_NAME_ERROR = "SET_LAST_NAME_ERROR",
	SET_CODE_ERROR = "SET_CODE_ERROR",
}

export interface SetForgotMsgSuccessAction {type: AuthActionEnum.SET_FORGOT_MSG, payload: string}
export interface SetLoadingAction {type: AuthActionEnum.SET_LOADING, payload: boolean}
export interface SetRememberAction {type: AuthActionEnum.SET_REMEMBER, payload: boolean}
export interface SetForgotSuccessAction {type: AuthActionEnum.SET_FORGOT_SUCCESS, payload: boolean}
export interface SetPhoneAction {type: AuthActionEnum.SET_PHONE, payload: string}
export interface SetAuthAction {type: AuthActionEnum.SET_AUTH, payload: boolean}
export interface SetPasswordAction {type: AuthActionEnum.SET_PASSWORD, payload: string}
export interface SetFirstNameAction {type: AuthActionEnum.SET_FIRST_NAME, payload: string}
export interface SetLastNameAction {type: AuthActionEnum.SET_LAST_NAME, payload: string}
export interface SetCodeAction {type: AuthActionEnum.SET_CODE, payload: string}
export interface SetTokenAction {type: AuthActionEnum.SET_TOKEN, payload: string}
export interface SetResponseAction {type: AuthActionEnum.SET_RESPONSE, payload: IResponse}
export interface SetUserAction {type: AuthActionEnum.SET_USER, payload: IUser}
export interface SetErrorAction {type: AuthActionEnum.SET_ERROR, payload: string}
export interface SetErrorsAction {type: AuthActionEnum.SET_ERRORS, payload: IErrors[]}
export interface SetPhoneErrorAction {type: AuthActionEnum.SET_PHONE_ERROR, payload: string}
export interface SetPasswordErrorAction {type: AuthActionEnum.SET_PASSWORD_ERROR, payload: string}
export interface SetFirstNameErrorAction {type: AuthActionEnum.SET_FIRST_NAME_ERROR, payload: string}
export interface SetLastNameErrorAction {type: AuthActionEnum.SET_LAST_NAME_ERROR, payload: string}
export interface SetCodeErrorAction {type: AuthActionEnum.SET_CODE_ERROR, payload: string}

export type AuthAction =
	SetAuthAction |
	SetLoadingAction |
	SetUserAction |
	SetErrorAction |
	SetRememberAction |
	SetErrorsAction |
	SetForgotSuccessAction |
	SetForgotMsgSuccessAction |
	SetPhoneAction |
	SetPasswordAction |
	SetFirstNameAction |
	SetLastNameAction |
	SetCodeAction |
	SetPhoneErrorAction |
	SetPasswordErrorAction |
	SetFirstNameErrorAction |
	SetLastNameErrorAction |
	SetCodeErrorAction |
	SetTokenAction |
	SetResponseAction