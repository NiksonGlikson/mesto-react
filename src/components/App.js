import React from 'react';
import '../index.css';
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import PopupWithForm from '../components/PopupWithForm.js';
import ImagePopup from '../components/ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';

function App() {

	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
	const [currentUser, setCurrentUser] = React.useState('');

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setSelectedCard({ name: '', link: '' });
	}

	function handleCardClick(cardInfo) {
		setSelectedCard({ name: cardInfo.name, link: cardInfo.link })
	}

	React.useEffect(() => {
		api.getUserInfo()
		.then((res) => {
			setCurrentUser(res)
		})
		.catch(err => `Данные пользователя не получены : ${err}`)
	}, []);
	


  return (
	  <CurrentUserContext.Provider value={currentUser}>
    <div className="body">
	<div className="page">
		<Header/>
		<Main
			onEditAvatar={handleEditAvatarClick}
			onEditProfile={handleEditProfileClick}
        	onAddPlace={handleAddPlaceClick}
			onCardClick={handleCardClick}
		/>
		<Footer/>
		<PopupWithForm
		title='Редактировать профиль'
		name='edit'
		isOpen={isEditProfilePopupOpen}
		onClose={closeAllPopups}
		buttonText='Сохранить'
		>
				<fieldset className="pop-up__inputs">
					<input className="pop-up__input pop-up__input_profile_name" id="name-input" name="name" type="text" placeholder="Имя" defaultValue="" minLength="2" maxLength="40" required/>
						<span className="error" id="name-input-error"></span>
					<input className="pop-up__input pop-up__input_profile_description" id="description-input" name="about" type="text" placeholder="Род деятельности" defaultValue="" minLength="2" maxLength="200" required/>
						<span className="error" id="description-input-error"></span>
				</fieldset>
		</PopupWithForm>
		<PopupWithForm
		title='Новое место'
		name='add'
		isOpen={isAddPlacePopupOpen}
		onClose={closeAllPopups}
		buttonText='Создать'
		>
				<fieldset className="pop-up__inputs">
					<input className="pop-up__input pop-up__input_name" id="place-input" name="name" type="text" defaultValue=""
						placeholder="Название" minLength="2" maxLength="30" required/>
						<span className="error" id="place-input-error"></span>
					<input className="pop-up__input pop-up__input_place" id="link-input" name="place" type="url" defaultValue=""
						placeholder="Ссылка на картинку" required/>
						<span className="error" id="link-input-error"></span>
				</fieldset>
		</PopupWithForm>
		<PopupWithForm
		title='Вы уверены?'
		name='correction'
		onClose={closeAllPopups}
		buttonText='Да'
		>
		</PopupWithForm>
		<PopupWithForm
		title='Обновить Аватар'
		name='avatar'
		isOpen={isEditAvatarPopupOpen}
		onClose={closeAllPopups}
		buttonText='Сохранить'
		>
				<fieldset className="pop-up__inputs">
					<input className="pop-up__input pop-up__input_avatar" id="avatar-input" name="avatar" type="url" defaultValue="" placeholder="Ссылка на картинку" required/>
					<span value="error" id="avatar-input-error"></span>
				</fieldset>
		</PopupWithForm>
		<ImagePopup
		onClose={closeAllPopups}
		card={selectedCard}
		/>
	</div>
</div>
</CurrentUserContext.Provider>
  );
}

export default App;
