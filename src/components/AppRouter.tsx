import React, {FC} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {privateRoutes, publicRoutes, RouteNames} from "../router/router";
import {useTypedSelector} from "../hooks/useTypedSelector";

const AppRouter:FC = () => {
	const {isAuth} = useTypedSelector(state => state.authReducer)
	
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