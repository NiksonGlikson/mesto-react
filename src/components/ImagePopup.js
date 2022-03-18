import React from 'react';

function ImagePopup(props) {
	return (
		<div className={props.card.name || props.card.link !== ''
		? 'pop-up pop-up_type_img pop-up_opened'
		: 'pop-up pop-up_type_img'}>
		<div className="pop-up__overlay" onClick={props.onClose}></div>
		<div className="pop-up__intro">
			<img 
			className="pop-up__image"
			src={props.card.link}
			alt={props.card.name}
			/>
			<button 
			className="pop-up__close-icon"
			type="button"
			onClick={props.onClose}>
			</button>
			<h2 className="pop-up__describe">{props.card.name}</h2>
		</div>
	</div>
	)
}

export default ImagePopup;