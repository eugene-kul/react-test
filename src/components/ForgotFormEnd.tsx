import React, {FC} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {Form} from "./UI/Form";
import Inputs from "./UI/Inputs";

const ForgotFormEnd:FC = () => {
	const {
		error,
		phone,
		code,
		password,
		forgotSuccess,
		forgotMsg,
		passwordError,
		codeError
	} = useTypedSelector(state => state.authReducer)
	
	const {forgotEnd, setCode, setPassword} = useActions()
	
	const onSubmit = () => {
		forgotEnd({
			phone: phone.replace(/[^0-9,]/g, ""),
			code,
			password
		})
	}
	
	return (
		<Form
			title={'Востановить пароль'}
			subTitle={forgotMsg}
			onSubmit={onSubmit}
			btnText={'Отправить'}
			success={forgotSuccess}
			links={[
				{slug:'/login',text:'Вспомнил пароль!'},
				{slug:'/reg',text:'Регистрация'},
			]}
		>
			<Inputs
				id={'phone-1'}
				className={`form__label ${error&&'error'}`}
				type={'tel'}
				value={phone}
				label={'Телефон'}
				mask={'7 (999) 999-99-99'}
				readOnly={true}
				autocomplete={'username'}
			/>
			<Inputs
				id={'code-1'}
				className={`form__label ${error&&'error'}`}
				type={'text'}
				value={code}
				label={'Код из SMS'}
				onChange={setCode}
				inputError={codeError}
				required={true}
				max={4}
				autocomplete={'off'}
			/>
			<Inputs
				id={'password-1'}
				className={`form__label ${error&&'error'}`}
				type={'password'}
				label={'Новый пароль'}
				value={password}
				onChange={setPassword}
				inputError={passwordError}
				required={true}
				autocomplete={'new-password'}
			/>
			{ error && <span className="error-msg">{error}</span> }
		</Form>
	);
};

export default ForgotFormEnd;