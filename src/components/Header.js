import React from 'react';
import logoHeader from '../images/logoheader.svg';

function Header() {
	return (
<header className="header">
			<a className="header__link" href="#">
        <img className="header__logo" src={logoHeader} alt="логотип Место" />
      </a>
		</header>
	);
}

export default Header;
