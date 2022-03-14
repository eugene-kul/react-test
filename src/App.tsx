import React, {useEffect} from 'react';
import './App.scss';
import AppRouter from "./components/AppRouter";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {Loading} from "./components/Loading";
import {useActions} from "./hooks/useActions";

const App:React.FC = () => {
	const props = useTypedSelector(state => state.authReducer)
	const {setToken} = useActions()
	
	useEffect(() => {
		const token = localStorage.getItem('token')
		token && setToken(token)
	},[])
	
	return (
		<div className="wrapper">
			<div className="container">
				{ props.isLoading && <Loading/> }
				<AppRouter/>
			</div>
		</div>
	);
}

export default App;
