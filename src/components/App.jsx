import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import logo from '../../public/logo.svg';
import '../index.css';
import Footer from './Footer/Footer.jsx';
import Main from './main/Main.jsx';
import Header from './header/Header.jsx';
import { api } from '../utils/API.js';
import { checkToken, signin, signup } from '../utils/auth.js';
import { setToken, getToken, removeToken } from '../utils/token.js';
import ProtectedRoute from './ProtectedRoute.jsx';
import Login from './Auth/Login.jsx';
import Register from './Auth/Register.jsx';
import InfoTooltip from './Main/Popup/InfoTooltip.jsx';

// TODO: implementar una versión móvil de la aplicación

/*
TODO: Mobile: El encabezado debe ser diferente para los usuarios autorizados y los no autorizados, según el diseño de Figma.
TODO: Mobile: Utiliza tu marcado de componentes de formulario y ventanas modales para implementar InfoTooltip, Login y Register.
*/

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();

  const fetchUser = async () => {
    const userDetails = await api.getUserInfo().then((userRes) => {
      console.log("User information fetched successfully:", userRes);
      return userRes;
    });
    return userDetails;
  }

  const fetchCards = async () => {
    const cardsRes = await api.getCards();
    return cardsRes;
  }

  async function verifyToken() {
    const token = getToken();
    if (token) {
      console.log("Token found");
      const { data } = await checkToken(token);
      setUserEmail(data.email);
      setCurrentUser({
        ...currentUser,
        "email": data.email,
        "_id": data._id,
      });
    }
    return token;
  };

  useEffect(() => {
    verifyToken().then((token) => {
    if (token) {
      setIsLoggedIn(true);

      navigate("/", { replace: true });
      console.log("Token is valid for user:", currentUser.email);
    } else {
      console.log("No token found");
      navigate("/signin", { replace: true });
    }
  });
  }, []);

  useEffect(() => {
    fetchUser().then((userDetails) => {
      setCurrentUser({...currentUser,...userDetails});
    });

    fetchCards().then((cardsData) => {
      setCards(cardsData);
    });
  }, [isLoggedIn]);

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
    signin({ password, email })
    .then(({token}) => {
      if (token) {
        setToken(token);
        setIsLoggedIn(true);
        // TODO: Guardar el email del usuario en el estado global
        setUserEmail(email);
        console.log("Login successful for user: ", email);
        navigate("/", { replace: true });
      }
    })
    .catch((err) => console.log(err));
  };

  function handleRegister({ password, email }) {
    signup({ password, email })
      .then(({ data }) => {
        console.log(data);

        setCurrentUser({
          email: data.email,
          _id: data._id,
          ...currentUser,
        });

        setPopup(
          {
            children: <InfoTooltip isSuccess={true} />,
            popupId: "successAuth-popup",
          }
        )
        console.log("Registration successful for user: ", currentUser);
        navigate("/signin", { replace: true });
      })
      .catch((err => {
        console.log("Registration error: ", err);
        setPopup(
          {
            children: <InfoTooltip isSuccess={false} />,
            popupId: "failedAuth-popup",
          }
        )
      }));
};

  function handleLogOut() {
    removeToken();
    setIsLoggedIn(false);
    navigate("/signin", { replace: true });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{
        currentUser,
        handleUpdateUser,
        onUpdateAvatar,
        handleAddPlaceSubmit,
        isLoggedIn,
        userEmail
        }}>
        <Header
          aroundLogo={logo}
          handleLogOut={handleLogOut}>
        </Header>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Main
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onOpenPopup={handleOpenPopup}
                onClosePopup={handleClosePopup}
                popup={popup}>
              </Main>
            </ProtectedRoute>
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
              handleRegister={handleRegister}
              popup={popup}
              onOpenPopup={handleOpenPopup}
              onClosePopup={handleClosePopup}
            />
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
