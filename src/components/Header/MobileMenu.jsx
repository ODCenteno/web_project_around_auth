import { useState } from 'react';
import { Link } from 'react-router-dom';
import menuIcon from '../../images/menu-icon.svg';
import closeIcon from '../../images/close.svg';


const MobileMenu = ({ isLoggedIn, isMobile, userEmail, handleClick }) => {

  const [menuVisible, setMenuVisible] = useState(isMobile);
  const menuClasses = `mobile-menu ${menuVisible ? 'mobile-menu--open' : ''}`;

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }

  return (
    <>
    {
      isLoggedIn ?
      <div className={menuClasses}>
        <img className={`mobile-menu__icon`} onClick={toggleMenu} alt="Cerrar X" src={!menuVisible ? menuIcon : closeIcon}/>

        <nav className={`mobile-menu__nav ${menuVisible ? 'menu__nav--hidden' : ''}`}>
          <ul className='mobile-menu__list'>
            <li className="mobile-menu__list-item header__link">{userEmail || "Email"}
            </li>
            <li className="mobile-menu__list-item">
              <Link to="/signin" onClick={handleClick} className="header__link header__link_type_logout">Cerrar Sesión</Link>
            </li>
          </ul>
        </nav>
      </div>
      :
      <div className={menuClasses}>
        {
          (location.pathname === '/signin') &&
          <Link to="/signup" className="header__link header__link_type_login">Regístrate</Link>
        }
        {
          (location.pathname === '/signup') &&
          <Link to="/signin" className="header__link header__link_type_login">Iniciar Sesión</Link>
        }
      </div>
    }
    </>
  );
};

export default MobileMenu;
