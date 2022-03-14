import React, {FC} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {Button} from "../components/UI/Button";

const Account:FC = () => {
	const {user,response} = useTypedSelector(state => state.authReducer)
	const {logout,clearData} = useActions()
	
	const logoutHandler = () => {
		logout()
		clearData()
	}
	
	return (
		<div className={'welcome-text'}>
			{ response.success && <p>{response.message}</p> }
			{ user.id && <p>Добро пожаловать, {user.first_name} {user.last_name}</p> }
			{ (response.success || user.id )&&<Button text={'Выйти'} className={"btn btn-danger"} onClick={logoutHandler} /> }
		</div>
	)
}

export default Account;