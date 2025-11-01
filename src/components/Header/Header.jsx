import { useContext, useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext.js"
import MobileMenu from "../Header/MobileMenu.jsx";


export default function Header(props) {
  const { handleLogOut, aroundLogo } = props;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isMobile = windowWidth <= 568;

  const updateWindowWidth = () => {
    const currentWidth = window.innerWidth;
    setWindowWidth(currentWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
  }}, []);

  const userContext = useContext(CurrentUserContext);
  const { userEmail, isLoggedIn } = userContext;

  const location = useLocation();

  const handleClick = () => {
    handleLogOut();
  };

  return (
    <header className="header page__header" onChange={updateWindowWidth}>
      <div className="header__logo-container">
        <img src={aroundLogo} alt="Around logo" className="header__logo"></img>
        <div className="header__auth-links">
          {
            isMobile &&
            <MobileMenu
              isLoggedIn={isLoggedIn}
              isMobile={isMobile}
              userEmail={userEmail}
              handleClick={handleClick}
            ></MobileMenu>
          }
          {
            !isMobile && isLoggedIn && <span className="header__link">{userEmail || "Email"}</span>
          }
          {
            !isMobile && isLoggedIn && <Link to="/signin" onClick={handleClick} className="header__link header__link_type_logout">Cerrar Sesión</Link>
          }
          { !isMobile && !isLoggedIn && (location.pathname === '/signin') &&
            <Link to="/signup" className="header__link header__link_type_register">Regístrate</Link>
          }
          { !isMobile && !isLoggedIn && (location.pathname === '/signup') &&
            <Link to="/signin" className="header__link header__link_type_login">Iniciar Sesión</Link>
          }
        </div>
      </div>
      <hr className="header__divisor"></hr>
    </header>
  )
}
