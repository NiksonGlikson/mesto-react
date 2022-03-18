import React from 'react';
import PopupWithForm from '../components/PopupWithForm.js';


function AddPlacePopup(props) {
	const [name, setName] = React.useState("");
	const [link, setLink] = React.useState("");

	function handleSubmit(evt) {
		evt.preventDefault();
	  
		props.onAddCard({
		  name,
		  link
		});
		props.onClose();
	  }

	  function handleChangePlace(evt) {
		setName(evt.target.value);
	  }

	  function handleChangeLink(evt) {
		setLink(evt.target.value);
	  }

	  React.useEffect(() => {
		  setName("");
		  setLink("");
	  }, [props.isOpen]);

	return (
		<PopupWithForm
			title='Новое место'
			name='add'
			isOpen={props.isOpen}
			onClose={props.onClose}
			buttonText='Создать'
			onSubmit={handleSubmit}
		>
				<fieldset className="pop-up__inputs">
					<input
						className="pop-up__input pop-up__input_name"
						id="place-input"
						name="name"
						type="text"
						value={name}
						placeholder="Название"
						minLength="2"
						maxLength="30"
						required
						onChange={handleChangePlace}
					/>
						<span 
							className="error"
							id="place-input-error">
						</span>
					<input
						className="pop-up__input pop-up__input_place"
						id="link-input"
						name="place"
						type="url"
						value={link}
						placeholder="Ссылка на картинку"
						required
						onChange={handleChangeLink}
					/>
						<span
							className="error"
							id="link-input-error">
						</span>
				</fieldset>
		</PopupWithForm>
	)
}

export default AddPlacePopup;
