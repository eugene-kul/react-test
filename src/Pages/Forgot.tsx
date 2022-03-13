import React, {FC} from 'react';
import ForgotFormEnd from "../components/ForgotFormEnd";
import ForgotForm from "../components/ForgotForm";
import {useTypedSelector} from "../hooks/useTypedSelector";

const Forgot:FC = () => {
	const {forgotSuccess} = useTypedSelector(state => state.authReducer)
	
	return (
		<>
			{ forgotSuccess
					? <ForgotFormEnd />
					: <ForgotForm/>
			}
		</>
	);
};

export default Forgot;