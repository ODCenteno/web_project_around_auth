import { useContext } from "react"
import { Link, useLocation } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext.js"


export default function Header(props) {
  const { handleLogOut, aroundLogo } = props;

  const userContext = useContext(CurrentUserContext);
  const { currentUser, isLoggedIn } = userContext;

  const location = useLocation();

  const handleClick = () => {
    handleLogOut();
  };

  return (
    <header className="header page__header">
      <div className="header__logo-container">
        <img src={aroundLogo} alt="Around logo" className="header__logo"></img>
        <div className="header__auth-links">
          {
            isLoggedIn && <span className="header__link">{currentUser.email || "Email"}</span>
          }
          {
            isLoggedIn && <Link to="/signin" onClick={handleClick} className="header__link header__link_type_logout">Cerrar Sesión</Link>
          }
          { !isLoggedIn && (location.pathname === '/signin') &&
            <Link to="/signup" className="header__link header__link_type_register">Regístrate</Link>
          }
          { !isLoggedIn && (location.pathname === '/signup') &&
            <Link to="/login" className="header__link header__link_type_login">Iniciar Sesión</Link>
          }
        </div>
      </div>
      <hr className="header__divisor"></hr>
    </header>
  )
}
