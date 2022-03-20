import React from 'react';
import PopupWithForm from '../components/PopupWithForm.js';

function DeleteCardPopup(props) {

	function handleSubmit(evt) {
		evt.preventDefault();
	  
		props.onCardDelete();
		props.onClose();
	  }
	  
	return (
		<>
		<PopupWithForm
			title='Вы уверены?'
			name='correction'
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			buttonText='Да'
			/>
		</>
	)
}

export default DeleteCardPopup;


