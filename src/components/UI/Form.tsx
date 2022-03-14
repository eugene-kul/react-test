import React, {FC} from "react";
import {Link} from "react-router-dom";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Button} from "./Button";
import {IFormProps} from "../../models/Interfaces";

export const Form:FC<IFormProps> = ({
	title,
	subTitle,
	text,
	children,
	onSubmit,
	btnText,
	links,
	success,
}) => {
	const {errors, error, phone, password, first_name, last_name, code, forgotSuccess} = useTypedSelector(state => state.authReducer)
	const {setForgotSuccess,clearInputErrors,clearData,setForgotMsg} = useActions()
	
	const onSubmitHandler = ( e:React.FormEvent<HTMLFormElement> ) => {
		e.preventDefault()
		if (errors.length || error) {clearInputErrors()}
		onSubmit()
	}
	
	const onClickHandler = () => {
		forgotSuccess && setForgotSuccess(false)
		if (phone || password || first_name || last_name || code) {clearData()}
		if (errors.length || error) {clearInputErrors()}
	}
	
	const returnHandler = () => {
		setForgotSuccess(false)
		setForgotMsg('')
	}
	
	return (
		<form
			name={'Форма: '+title}
			autoComplete={'on'}
			className={'form'}
			onSubmit={e => onSubmitHandler(e)}
		>
			<div className="form__title">{title}</div>
			<div className={`form__sub-title ${success?'success':''}`}>{subTitle}</div>
			
			{ children }
			
			<div className="form__link">
				{ text && <span>{text}</span> }
				{links && links.map((link,index) => {
					return <Link to={link.slug} key={index} onClick={onClickHandler}>{link.text}</Link>
				})}
			</div>
			
			<div className="form__btn-body">
				<Button text={btnText} className={"btn btn-primary"} type={"submit"}/>
				{ forgotSuccess && <Button text={"Отмена"} className={"btn btn-default"} onClick={returnHandler}/> }
			</div>
			
			<div className="form__info"><i>•</i> - обязательные поля для заполнения</div>
		</form>
	);
}