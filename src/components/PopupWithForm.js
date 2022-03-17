import React from 'react';

function PopupWithForm(props) {

 	return (
		<div className={props.isOpen
		? `pop-up pop-up_type_${props.name} pop-up_opened`
		: `pop-up pop-up_type_${props.name}`} >
		<div className="pop-up__overlay" onClick={props.onClose}></div>
		<div className="pop-up__content">
			<button className="pop-up__close-icon" type="button" onClick={props.onClose}></button>
			<h2 className="pop-up__title">{props.title}</h2>
			<form name="add-form" action="#" method="POST" className="pop-up__form" onSubmit={props.onSubmit}>
				{props.children}
			<button className="pop-up__submit-button" type="submit">{props.buttonText}</button>
			</form>
		</div>
	</div>
	);
}

export default PopupWithForm;