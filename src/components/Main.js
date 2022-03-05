import React from 'react';
import api from '../utils/Api.js';
import Card from '../components/Card.js';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
	const [userName, setUserName] = React.useState('');
	const [userDescription, setUserDescription] = React.useState('');
	const [userAvatar, setUserAvatar] = React.useState('');
	const [cards, setCards] = React.useState([]);

	React.useEffect(() => {
		api.getUserInfo()
		.then((info) => {
			setUserName(info.name)
			setUserDescription(info.about)
			setUserAvatar(info.avatar)
		})
		.catch(err => `Данные пользователя не получены : ${err}`)

		api.getInitialCards()
		.then((cards) => {
			setCards(cards);
		})
		.catch(err => `Не удалось получить карточки с сервера : ${err}`)
	}, []);

	return (
		<main className="main">
			<section className="profile">
				<button className="profile__button-avatar" type="button" onClick={onEditAvatar}>
				<img className="profile__avatar" name="avatar" alt="Ваше фото профиля" src={userAvatar}/>
				</button>
				<div className="profile__container">
					<div className="profile__info">
						<div className="profile__description">
							<h1 className="profile__title">{userName}</h1>
							<button className="profile__button-edit" type="button" onClick={onEditProfile}></button>
						</div>
						<p className="profile__subtitle">{userDescription}</p>
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
					/>
				))}
			</section>
		</main>
	);
	

}

export default Main;
