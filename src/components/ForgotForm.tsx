import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {Form} from "./UI/Form";
import Inputs from "./UI/Inputs";

const ForgotForm:FC = () => {
	const {phone, error,phoneError} = useTypedSelector(state => state.authReducer)
	const {forgot,setPhone,clearErrors,clearData} = useActions()
	
	useEffect(() => {
		clearErrors()
		clearData()
	},[])
	
	const onSubmit = () => {
		forgot({phone: phone.replace(/[^0-9,]/g, "")})
	}
	
	return (
		<Form
			title={'Востановить пароль'}
			subTitle={'Введите телефон, указанный при регистрации'}
			onSubmit={onSubmit}
			btnText={'Отправить'}
			
			links={[
				{slug:'/login',text:'Вспомнил пароль!'},
				{slug:'/reg',text:'Регистрация'}
			]}
		>
			<Inputs
				id={'phone-1-1'}
				className={`form__label ${error&&'error'}`}
				type={'tel'}
				value={phone}
				label={'Телефон'}
				mask={'7 (999) 999-99-99'}
				onChange={setPhone}
				required={true}
				autocomplete={'username'}
				inputError={phoneError}
			/>
			{ error && <span className="error-msg">{error}</span> }
		</Form>
	);
};

export default ForgotForm;