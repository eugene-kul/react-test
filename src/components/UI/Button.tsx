import React, {FC} from "react";
import {IButtonsProps} from "../../models/Interfaces";

const Button:FC<IButtonsProps> = ({
	className,
	text,
	type="button",
	onClick
}) => {
	return (
		<button className={className} type={type} onClick={onClick}>{text}</button>
	);
};

export default Button;