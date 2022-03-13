import React, {FC, useEffect} from 'react';
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Form} from "./UI/Form";
import Inputs from "./UI/Inputs";

const LoginForm:FC = () => {
	const {
		error,
		phone,
		password,
		phoneError,
		passwordError,
		isRemember,
	} = useTypedSelector(state => state.authReducer)
	
	const {
		login,
		setRemember,
		setForgotSuccess,
		setPhone,
		setPassword,
		clearErrors,
		clearData
	} = useActions()
	
	useEffect(() => {
		setForgotSuccess(false)
		clearErrors()
		clearData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])
	
	const onSubmit = ():void => {
		login({
			phone: phone.replace(/[^0-9,]/g, ''),
			password
		}, isRemember)
	}
	
	return (
		<Form
			title={'Войти'}
			subTitle={'Введите данные, указанные при регистрации'}
			onSubmit={onSubmit}
			btnText={'Войти'}
			links={[
				{slug:'/forgot',text:'Востановить пароль'},
				{slug:'/reg',text:'Регистрация'},
			]}
		>
			<Inputs
				id={'phone-1-1'}
				className={`form__label ${error&&'error'}`}
				type={'tel'}
				label={'Телефон'}
				value={phone}
				name={'phone'}
				mask={'7 (999) 999-99-99'}
				onChange={setPhone}
				inputError={phoneError}
				required={true}
				autocomplete={'username'}
			/>
			<Inputs
				id={'password-1-1'}
				className={`form__label ${error&&'error'}`}
				type={'password'}
				label={'Пароль'}
				value={password}
				name={'password'}
				onChange={setPassword}
				inputError={passwordError}
				required={true}
				autocomplete={'current-password'}
			/>
			{ error && <span className="error-msg">{error}</span> }
			<Inputs
				id={'checkbox-1'}
				className={`form__label custom-checkbox`}
				type={'checkbox'}
				label={'Запомнить меня'}
				checked={isRemember}
				onChange={setRemember}
			/>
		</Form>
	);
};

export default LoginForm;