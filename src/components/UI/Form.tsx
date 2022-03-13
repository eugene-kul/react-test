import React, {FC} from "react";
import {Link} from "react-router-dom";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import Button from "./Button";
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
	const {forgotSuccess} = useTypedSelector(state => state.authReducer)
	const {setForgotSuccess,clearErrors} = useActions()
	
	const onSubmitHandler = ( e:React.FormEvent<HTMLFormElement> ) => {
		e.preventDefault()
		clearErrors()
		onSubmit()
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
				{
					links && links.map((link,index) => {
						return <Link to={link.slug} key={index}>{link.text}</Link>
					})
				}
			</div>
			
			<div className="form__btn-body">
				<Button text={btnText} className={"btn btn-primary"} type={"submit"}/>
				{ forgotSuccess && <Button text={"Отмена"} className={"btn btn-default"} onClick={() => setForgotSuccess(false)}/> }
			</div>
			
			<div className="form__info"><i>•</i> - обязательные поля для заполнения</div>
		</form>
	);
}