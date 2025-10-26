import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import logo from '../../public/logo.svg';
import '../index.css';
import Footer from './Footer/Footer.jsx';
import Main from './main/Main.jsx';
import Header from './header/Header.jsx';
import { api, apiAuth } from '../utils/API.js';
import { signin, signup } from '../utils/auth.js';
import { setToken, getToken } from '../utils/token.js';
import ProtectedRoute from './ProtectedRoute.jsx';
import Login from './Auth/Login.jsx';
import Register from './Auth/Register.jsx';

// TODO: implementar una versión móvil de la aplicación

/*
TODO: Mobile: El encabezado debe ser diferente para los usuarios autorizados y los no autorizados, según el diseño de Figma.
TODO: Mobile: Utiliza tu marcado de componentes de formulario y ventanas modales para implementar InfoTooltip, Login y Register.
TODO: En este proyecto, necesitarás implementar la funcionalidad del registro y la autorización. Para ello, tendrás que expandir alguno de los componentes que hayas utilizado en tu proyecto en los sprints anteriores.
TODO: Las funciones, la habilitación de solicitudes API relacionadas con el registro y la autorización deben estar ubicadas en el archivo auth.js en la carpeta /utils.

*/

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      const cardsRes = await api.getCards();
      setCards(cardsRes);
    }
    fetchCards();
  }, [])

  const handleCardLike = async (card) => {
    const isLiked = card.isLiked;

    await api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
    }).catch((error) => console.error(error));
  }

  const handleCardDelete = (cardToDelete) => {
    const updatedCards = cards.filter((card) => card._id !== cardToDelete._id)
    setCards(updatedCards)
  }

  const handleAddPlaceSubmit = (newPlace) => {
    (async () => {
      await api.postNewCard(newPlace).then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  }

  useEffect(() => {
    const fetchUser = async () => {
      await api.getUserInfo().then((userRes) => {
        setCurrentUser(userRes);
      });
    }
    fetchUser();
  }, [])

  const handleUpdateUser = (data) => {
    (async () => {
      await api.saveUserDetails(data).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function onUpdateAvatar(avatar) {
    api.saveAvatar(avatar).then((user) => setCurrentUser(user)
    );
    handleClosePopup();
  }

  function handleLogin({ password, email }) {
    if (!email || !password) {
      return;
    }

    signin({ password, email })
    .then(({token}) => {
      if (token) {
        setToken(token);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      }
    })
    .catch((err) => console.log(err));
  };

  function handleRegister({ password, email }){
    if (!email || !password) {
      return;
    }

    signup({ password, email })
      .then(({ data }) => {
        console.log(data);
        if (!data) {
          throw new Error("No user data found");
        }
        setCurrentUser({ ...currentUser, email: data.email, _id: data._id });
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch(console.error());
};

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{
        currentUser,
        handleUpdateUser,
        onUpdateAvatar,
        handleAddPlaceSubmit,
        isLoggedIn
        }}>
        <Header
          aroundLogo={logo}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          popup={popup}>
        </Header>
        <Routes>
          <Route path="/" element={
            <Main
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}>
            </Main>
          }>
          </Route>
          <Route path="/signin" element={
            <Login className="auth__container"
              handleLogin={handleLogin}
              onOpenPopup={handleOpenPopup}
              onClosePopup={handleClosePopup}
              popup={popup}>
            </Login>
          }>
          </Route>
          <Route path="/signup" element={
            <Register className="auth__container"
              handleRegister={handleRegister} />
          }></Route>
          <Route
          path="*"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace/>
            ) : (
              <Navigate to="/signin" replace/>
            )
          }></Route>
        </Routes>
        <Footer></Footer>
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App
