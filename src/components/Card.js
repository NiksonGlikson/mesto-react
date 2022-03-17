import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
	function handleClick() {
		props.onCardClick(props.card);
	}

	function handleLikeClick() {
		props.onCardLike(props.card);
	}

	function handleDeleteClick() {
		props.onCardDelete(props.card);
	}

const currentUser = React.useContext(CurrentUserContext);

const isOwn = props.card.owner._id === currentUser._id;
const cardDeleteButtonClassName = (
  	`${isOwn ? 'element__trash element__trash_show' : 'element__trash'}`
);

const isLiked = props.card.likes.some(i => i._id === currentUser._id);
const cardLikeButtonClassName = (
	`${isLiked ? 'element__like element__like_type_black' : 'element__like'}`
);

	return (
		<div className="element">
			<img className="element__img" onClick={handleClick} src={props.card.link} alt={props.card.name}/>
			<button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
			<div className="element__items">
				<h2 className="element__title">{props.card.name}</h2>
				<div className="element__items-counter">
					<button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
					<span className="element__like-counter">{props.card.likes.length}</span>
				</div>
			</div>
		</div>
	)
}

export default Card;