import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from '../components/PopupWithForm.js';

function EditProfilePopup(props) {
	const currentUser = React.useContext(CurrentUserContext);
	const [name, setName] = React.useState(currentUser.name);
	const [description, setDescription] = React.useState(currentUser.about);

	  function handleChangeName(evt) {
		setName(evt.target.value);
	  }

	  function handleChangeDescription(evt) {
		setDescription(evt.target.value);
	  }

	  function handleSubmit(evt) {
		evt.preventDefault();
	  
		props.onUpdateUser({
		  name: name,
		  about: description,
		});
		props.onClose();
	  }

	  React.useEffect(() => {
		if (currentUser)
		setName(currentUser.name);
		setDescription(currentUser.about);
	  }, [currentUser, props.isOpen]);

	return (
	<PopupWithForm
		title='Редактировать профиль'
		name='edit'
		isOpen={props.isOpen}
		onClose={props.onClose}
		onSubmit={handleSubmit}
		buttonText='Сохранить'
		>
				<fieldset className="pop-up__inputs">
					<input 
						className="pop-up__input pop-up__input_profile_name"
						id="name-input"
						name="name"
						value={name || ""}
						type="text"
						placeholder="Имя"
						minLength="2"
						maxLength="40"
						required
						onChange={handleChangeName}
					/>
					<span
						className="error"
						id="name-input-error"></span>
					<input 
						className="pop-up__input pop-up__input_profile_description"
						value={description || ""}
						id="description-input"
						name="about"
						type="text"
						placeholder="Род деятельности"
						minLength="2"
						maxLength="200"
						required
						onChange={handleChangeDescription}
						/>
					<span 
						className="error"
						id="description-input-error"></span>
				</fieldset>
		</PopupWithForm>
	);
}

	export default EditProfilePopup;
