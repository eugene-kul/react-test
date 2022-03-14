import {AppDispatch} from "../../store";
import {AuthActionCreators} from "./actionCreators";

export function setErrorsFromResponse(error:any, dispatch: AppDispatch):void {
	error.response?.data.errors
		? setInputsError(error.response?.data.errors,dispatch)
		: error.response?.data.message
			? dispatch(AuthActionCreators.setError(error.response?.data.message))
			: dispatch(AuthActionCreators.setError(error.message))
}

function setInputsError(errors:Array<any>,dispatch: AppDispatch):void {
	dispatch(AuthActionCreators.setErrors(errors))
	
	function getParamError(trigger:string) {
		const error = errors.find(error => error.param === trigger)
		return error?.msg || ''
	}
	
	getParamError('phone') && dispatch(AuthActionCreators.setPhoneError(getParamError('phone')))
	getParamError('password') && dispatch(AuthActionCreators.setPasswordError(getParamError('password')))
	getParamError('first_name') && dispatch(AuthActionCreators.setFirstNameError(getParamError('first_name')))
	getParamError('last_name') && dispatch(AuthActionCreators.setLastNameError(getParamError('last_name')))
	getParamError('code') && dispatch(AuthActionCreators.setCodeError(getParamError('code')))
}