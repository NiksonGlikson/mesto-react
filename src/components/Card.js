import React from 'react';

function Card(props) {
	function handleClick() {
		props.onCardClick(props.card);
	}

	return (
		<div className="element">
			<img className="element__img" onClick={handleClick} src={props.card.link} alt={props.card.name}/>
			<button className="element__trash" type="button"></button>
			<div className="element__items">
				<h2 className="element__title">{props.card.name}</h2>
				<div className="element__items-counter">
					<button className="element__like" type="button"></button>
					<span className="element__like-counter">{props.card.likes.length}</span>
				</div>
			</div>
		</div>
	)
}

export default Card;