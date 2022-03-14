import React, {FC} from 'react';
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Form} from "./UI/Form";
import Inputs from "./UI/Inputs";

const RegForm:FC = () => {
	const {phone,password,first_name,last_name,phoneError,passwordError,first_nameError,last_nameError,error} = useTypedSelector(state => state.authReducer)
	const {reg,setPhone,setPassword,setFirstName,setLastName} = useActions()
	
	const onSubmit = ():void => {
		reg({
			phone: phone.replace(/[^0-9,]/g, ""),
			password,
			first_name,
			last_name
		})
	}
	
	return (
		<Form
			title={'Регистрация'}
			subTitle={'Заполните форму для регистрации нового пользователя'}
			onSubmit={onSubmit}
			btnText={'Регистрация'}
			text={'Уже есть аккаунт?'}
			links={[
				{slug:'/login',text:'Войти'},
			]}
		>
			<Inputs
				id={'text-1'}
				className={`form__label ${error&&'error'}`}
				type={'text'}
				value={first_name}
				label={'Имя'}
				name={'first_name'}
				onChange={setFirstName}
				inputError={first_nameError}
				required={true}
				autocomplete={'given-name'}
			/>
			<Inputs
				id={'text-2'}
				className={`form__label ${error&&'error'}`}
				type={'text'}
				value={last_name}
				label={'Фамилия'}
				name={'last_name'}
				onChange={setLastName}
				inputError={last_nameError}
				required={true}
				autocomplete={'family-name'}
			/>
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
				autocomplete={'tel'}
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
				autocomplete={'new-password'}
			/>
			
			{ error && <span className="error-msg">{error}</span> }
		</Form>
	);
};

export default RegForm;