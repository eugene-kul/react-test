import axios, {AxiosResponse} from "axios";
import {IUser} from "../../../models/Interfaces";

const API_URL:string = 'https://backend-front-test.dev.echo-company.ru/api';

export async function getUserDataAPI(token:string):Promise<AxiosResponse<IUser>> {
	return await axios.get<IUser>(API_URL+"/user", { headers: { Authorization: token } })
}

export async function regUserAPI(data: {}):Promise<AxiosResponse<IUser>> {
	return await axios.post<IUser>(API_URL+"/user/registration", data)
}

export async function loginUserAPI(data: {}):Promise<AxiosResponse<IUser>> {
	return await axios.post<IUser>(API_URL+"/auth/login", data)
}

export async function forgotEndAPI(data: {}):Promise<AxiosResponse<IUser>> {
	return await axios.post<IUser>(API_URL+"/user/forgot-end", data)
}

export async function forgotStartAPI(data: {}):Promise<AxiosResponse<IUser>> {
	return await axios.post<IUser>(API_URL+"/user/forgot-start", data)
}