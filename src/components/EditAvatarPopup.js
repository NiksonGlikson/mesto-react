import React from 'react';
import PopupWithForm from '../components/PopupWithForm.js';

function EditAvatarPopup(props) {
	const avatarRef = React.useRef();

	function handleSubmit(evt) {
		evt.preventDefault();
	  
		props.onUpdateAvatar(avatarRef.current.value);
		props.onClose();
	  }

React.useEffect(() => {
	avatarRef.current.value = "";
}, [props.isOpen]);

	return (
		<PopupWithForm
			title='Обновить Аватар'
			name='avatar'
			isOpen={props.isOpen}
			onClose={props.onClose}
			buttonText='Сохранить'
			onSubmit={handleSubmit}
		>
				<fieldset className="pop-up__inputs">
					<input 
						ref={avatarRef}
						className="pop-up__input pop-up__input_avatar"
						id="avatar-input"
						name="avatar"
						defaultValue=""
						type="url"
						placeholder="Ссылка на картинку"
						required
					/>
					<span 
						value="error"
						id="avatar-input-error">
					</span>
				</fieldset>
		</PopupWithForm>
	)
}

export default EditAvatarPopup;