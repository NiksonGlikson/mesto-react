import React from 'react';
import '../index.css';
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import PopupWithForm from '../components/PopupWithForm.js';
import ImagePopup from '../components/ImagePopup.js';
import EditProfilePopup from '../components/EditProfilePopup.js';
import EditAvatarPopup from '../components/EditAvatarPopup.js';
import AddPlacePopup from '../components/AddPlacePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';

function App() {

	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
	const [currentUser, setCurrentUser] = React.useState('');
	const [cards, setCards] = React.useState([]);

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

	function handleUpdateUser(currentUser) {
		api.editUserInfo({ name: currentUser.name, about: currentUser.about })
		.then((res) => {
			setCurrentUser(res);
			closeAllPopups();
		})
		.catch((err) => {
			console.log(`${err}`);
		})
	}

	function handleUpdateAvatar(avatar) {
		api.editUserAvatar(avatar)
		.then((res) => {
			setCurrentUser(res);
			closeAllPopups();
		})
		.catch((err) => {
			console.log(`${err}`);
		})
	}

	function handleAddPlaceSubmit({ name, link }) {
		api.createCard({ name, link })
		.then((newCard) => {
			setCards([newCard, ...cards]);
			closeAllPopups();
		})
		.catch((err) => {
			console.log(`${err}`);
		})
	}

	React.useEffect(() => {
		Promise.all([api.getInitialCards(), api.getUserInfo()])

		.then(([cards, res]) => {
			setCurrentUser(res);
			setCards(cards);
		})
		.catch(err => `Не удалось получить карточки с сервера : ${err}`)
	}, []);

	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		
		api.changeLikeCardStatus(card._id, !isLiked)
		.then((newCard) => {
			setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
		})
		.catch((err) => {
			console.log(`${err}`);
		});
	};

	function handleCardDelete(card) {
		const deleteCards = cards.filter((c) => c._id !== card._id);

		api.handleDelete(card._id)
		.then(() => {
			setCards(deleteCards);
		})
		.catch((err) => {
			console.log(`${err}`);
		})
	}

  return (
	<CurrentUserContext.Provider value={currentUser}>
		<div className="body">
			<div className="page">
				<Header 
				/>
				<Main
					onEditAvatar={handleEditAvatarClick}
					onEditProfile={handleEditProfileClick}
					onAddPlace={handleAddPlaceClick}
					onCardClick={handleCardClick}
					onCardLike={handleCardLike}
					onCardDelete={handleCardDelete}
					cards={cards}
				/>
				<Footer 
				/>
				<EditProfilePopup 
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser} 
				/>
				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddCard={handleAddPlaceSubmit}
				/>
				<PopupWithForm
					title='Вы уверены?'
					name='correction'
					onClose={closeAllPopups}
					buttonText='Да'
				>
				</PopupWithForm>
				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
				/>
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