import React, {FC, useEffect} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {privateRoutes, publicRoutes, RouteNames} from "../router/router";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {getUserDataAPI} from "../store/reducers/auth/getUserData";

const AppRouter:FC = () => {
	const {isAuth,token} = useTypedSelector(state => state.authReducer)
	const {setUser,setIsAuth,setError,setLoading} = useActions()
	
	useEffect(() => {
		if(token) {
			setLoading(true)
			setIsAuth(true)
			getUserDataAPI(token).then(
				result => {
					setUser(result.data)
					setLoading(false)
				}, error => {
					setLoading(false)
               setIsAuth(false)
					error.response?.data.message
						? setError(error.response?.data.message)
						: setError(error.message)
				}
			)
		}
	},[token])
	
	return (
		<>
			{isAuth
				? <Routes>
						{privateRoutes.map(route => {
							return <Route key={route.path} path={route.path} element={<route.element/>} />
						})}
						<Route path={'*'} element={<Navigate replace to={RouteNames.ACCOUNT} />} />
					</Routes>
				: <Routes>
						{publicRoutes.map(route => {
							return <Route key={route.path} path={route.path} element={<route.element/>} />
						})}
						<Route path={'*'} element={<Navigate replace to={RouteNames.LOGIN} />} />
					</Routes>
			}
		</>
	);
};

export default AppRouter;