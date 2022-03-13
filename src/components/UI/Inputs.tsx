import React, {FC, useEffect, useState} from "react";
import InputMask from "react-input-mask";
import {useActions} from "../../hooks/useActions";
import {IInputProps} from "../../models/Interfaces";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const Inputs:FC<IInputProps> = ({
	className,
	value,
	onChange,
	mask,
	inputError,
	id,
	checked,
	label,
	name = label,
	type,
	max = 20,
	required,
	autocomplete = 'off',
	readOnly
}) => {
	const [isActive, setIsActive] = useState<boolean>(false)
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const {clearErrors,setPhoneError,setPasswordError,setFirstNameError,setLastNameError,setCodeError} = useActions()
	const {error} = useTypedSelector(state => state.authReducer)
	
	const onBlurHandler = (val:string):void => {
		isActive&&val===''&&setIsActive(false)
	}
	
	const onFocusHandler = (val:string):void => {
		!isActive&&setIsActive(true)
	}
	
	const onChangeHandler = (value:string):void => {
		if (inputError) {
			name==='phone'&&setPhoneError('')
			name==='first_name'&&setFirstNameError('')
			name==='last_name'&&setLastNameError('')
			name==='password'&&setPasswordError('')
			name==='code'&&setCodeError('')
		}
		
		error && clearErrors()
		
		!isActive && value && setIsActive(true)
		onChange&&onChange(value)
	}
	
	const classes = () => {
		return [
			className,
			isActive||value?'active':'',
			inputError?'error':''
		].join(' ')
	}
	
	return (
		<label className={classes()} htmlFor={id}>
			{ type !== 'checkbox' && <span className="form__label-text noselect">{label}{required&&<i>•</i>}</span> }
			{
				type === 'tel' ?
					<InputMask
						id={id}
						type={'tel'}
						mask={mask!}
						maskPlaceholder={null}
						value={value}
						name={name}
						onFocus={e => onFocusHandler(e.target.value)}
						onBlur={e => onBlurHandler(e.target.value)}
						onChange={e => onChangeHandler(e.target.value)}
						autoComplete={autocomplete}
					/> :
					type === 'checkbox' ?
						<>
							<input
								id={id}
								type={'checkbox'}
								name={name}
								checked={checked}
								onChange={() => onChange&&onChange(!checked)}
							/>
							<div className="custom-checkbox--indicator"></div>
							<span className="form__label-text noselect">{label}</span>
						</> :
						<input
							id={id}
							type={type==='password'?showPassword?'text':'password':type}
							value={value}
							name={name}
							onFocus={e => onFocusHandler(e.target.value)}
							onBlur={e => onBlurHandler(e.target.value)}
							onChange={e => onChangeHandler(e.target.value)}
							autoComplete={autocomplete}
							maxLength={max}
						/>
			}
			{ type==='password' && <span className="password-control-link noselect" onClick={() => setShowPassword(!showPassword)}>{showPassword?'скрыть пароль':'показать пароль'}</span> }
			{ inputError && <span className="error-msg flash-msg">{inputError}</span> }
		</label>
	);
};

export default Inputs;