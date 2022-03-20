import React from 'react';
import '../index.css';
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import ImagePopup from '../components/ImagePopup.js';
import EditProfilePopup from '../components/EditProfilePopup.js';
import EditAvatarPopup from '../components/EditAvatarPopup.js';
import AddPlacePopup from '../components/AddPlacePopup.js';
import DeleteCardPopup from '../components/DeleteCardPopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';

function App() {

	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
	const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
	const [currentUser, setCurrentUser] = React.useState({});
	const [cards, setCards] = React.useState([]);
	const [cardDelete, setCardDelete] = React.useState();

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}

	function handleDeletePopupClick(cardInfo) {
		setIsDeletePopupOpen(true);
		setCardDelete(cardInfo);
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsDeletePopupOpen(false);
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

		api.handleDelete(card._id)
		.then(() => {
			const deleteCards = cards.filter((c) => c._id !== card._id);
			setCards(deleteCards);
			closeAllPopups();
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
					onCardDelete={handleDeletePopupClick}
					onCardClick={handleCardClick}
					onCardLike={handleCardLike}
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
				<DeleteCardPopup
					isOpen={isDeletePopupOpen}
					onClose={closeAllPopups}
					card={selectedCard}
					onCardDelete={() => handleCardDelete(cardDelete)}
				/>
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