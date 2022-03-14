import Login from "../Pages/Login";
import Account from "../Pages/Account";
import Reg from "../Pages/Reg";
import Forgot from "../Pages/Forgot";
import {IRoute} from "../models/Interfaces";

export enum RouteNames {
	FORGOT = '/forgot',
	REG = '/reg',
	LOGIN = '/login',
	ACCOUNT = '/'
}

export const publicRoutes:IRoute[] = [
	{path: RouteNames.LOGIN, element: Login},
	{path: RouteNames.FORGOT, element: Forgot},
	{path: RouteNames.REG, element: Reg}
]

export const privateRoutes:IRoute[] = [
	{path: RouteNames.ACCOUNT, element: Account}
]