import {AppDispatch} from "../../store";
import {AuthActionCreators} from "./actionCreators";

export function GetErrors(error:any, dispatch: AppDispatch):void {
	error.response?.data.errors
		? GetInputsError(error.response?.data.errors,dispatch)
		: error.response?.data.message
			? dispatch(AuthActionCreators.setError(error.response?.data.message))
			: dispatch(AuthActionCreators.setError(error.message))
}

function GetInputsError(errors:Array<any>,dispatch: AppDispatch):void {
	dispatch(AuthActionCreators.setErrors(errors))
	
	function getError(trigger:string) {
		return errors.find(error => error.param === trigger)?.msg || ''
	}
	
	dispatch(AuthActionCreators.setPhoneError(getError('phone')))
	dispatch(AuthActionCreators.setPasswordError(getError('password')))
	dispatch(AuthActionCreators.setFirstNameError(getError('first_name')))
	dispatch(AuthActionCreators.setLastNameError(getError('last_name')))
	dispatch(AuthActionCreators.setCodeError(getError('code')))
}