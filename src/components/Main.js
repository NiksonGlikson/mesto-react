import React from 'react';
import api from '../utils/Api.js';
import Card from '../components/Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
	const [cards, setCards] = React.useState([]);
	const currentUser = React.useContext(CurrentUserContext);

	React.useEffect(() => {
		api.getInitialCards()
		.then((cards) => {
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
		<main className="main">
			<section className="profile">
				<button className="profile__button-avatar" type="button" onClick={onEditAvatar}>
				<img className="profile__avatar" name="avatar" alt="Ваше фото профиля" src={currentUser.avatar}/>
				</button>
				<div className="profile__container">
					<div className="profile__info">
						<div className="profile__description">
							<h1 className="profile__title">{currentUser.name}</h1>
							<button className="profile__button-edit" type="button" onClick={onEditProfile}></button>
						</div>
						<p className="profile__subtitle">{currentUser.about}</p>
					</div>
				</div>
				<button className="profile__button-add" type="button" onClick={onAddPlace}></button>
			</section>

			<section className="elements">
				{cards.map((card) => (
					<Card
						key={card._id}
						card={card}
						onCardClick={onCardClick}
						onCardLike={handleCardLike}
					/>
				))}
			</section>
		</main>
	);
	

}

export default Main;
