import React, {FC} from "react";
import {IButtonsProps} from "../../models/Interfaces";

export const Button:FC<IButtonsProps> = ({
	className,
	text,
	type="button",
	onClick
}) => (
	<button className={className} type={type} onClick={onClick}>{text}</button>
)