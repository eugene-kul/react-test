import React, {FC} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import Button from "../components/UI/Button";

const Account:FC = () => {
	const {user} = useTypedSelector(state => state.authReducer)
	const {logout,clearData} = useActions()
	
	const logoutHandler = () => {
		logout()
		clearData()
	}
	
	return (
		<div className={'welcome-text'}>
			{ user.message
					? <p>{user.message}</p>
					:	<p>Добро пожаловать, {user.first_name} {user.last_name}</p>
			}
			<Button text={'Выйти'} className={"btn btn-danger"} onClick={logoutHandler} />
		</div>
	);
};

export default Account;