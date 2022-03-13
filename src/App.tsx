import React, {useEffect} from 'react';
import './App.scss';
import AppRouter from "./components/AppRouter";
import {useActions} from "./hooks/useActions";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {Loading} from "./components/Loading";
import {getUserDataAPI} from "./store/reducers/auth/getUserData";

const App:React.FC = () => {
	const {setUser,setIsAuth,setError} = useActions()
	const {isLoading} = useTypedSelector(state => state.authReducer)
	
	useEffect(() => {
		const token:string = localStorage.getItem('token') || '';
		
		if(token) {
			getUserDataAPI(token).then(
				result => {
					setUser(result.data)
					setIsAuth(true)
				}, error => {
					error.response?.data.message
						? setError(error.response?.data.message)
						: setError(error.message)
				}
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])
	
	return (
		<div className={'page color-1'}>
			{ isLoading && <Loading/> }
			<AppRouter/>
		</div>
	);
}

export default App;
