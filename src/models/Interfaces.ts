import React from "react";

export interface IErrors {
	value:string;
	msg:string;
	param:string;
	location:string;
}

export interface IFormProps {
	title:string,
	subTitle:string,
	onSubmit:() => void,
	btnText:string,
	text?:string,
	success?:boolean,
	links?:Array<{slug:string, text:string}>
}

export interface IInputProps {
	id:string
	name?:string
	className:string
	label:string
	type?:string
	value?:string
	checked?:boolean
	onChange?:any
	mask?:string | (string | RegExp)[]
	inputError?:string
	required?:boolean
	max?:number
	autocomplete?:string
}

export interface IUser {
	id?:number;
	phone:string;
	password:string;
	first_name?:string;
	last_name?:string;
	token?:string;
	message?:string;
	success?:boolean
}

export interface IResponse {
	token?:string;
	message:string;
	success:boolean
}

export interface IButtonsProps {
	className:string
	text:string
	type?:"button"|"submit"|"reset"
	onClick?:React.MouseEventHandler<HTMLButtonElement>
}

export interface IRoute {
	path:string
	element:React.ComponentType
}

export interface IAuthState {
	isAuth:boolean
	token:string
	user:IUser
	response:IResponse
	isLoading:boolean
	error:string
	errors:IErrors[]
	isRemember:boolean
	forgotSuccess:boolean
	forgotMsg:string
	phone:string
	password:string
	first_name:string
	last_name:string
	code:string
	phoneError:string
	passwordError:string
	first_nameError:string
	last_nameError:string
	codeError:string
}