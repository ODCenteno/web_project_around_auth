import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { api } from '../utils/API.js';
import { checkToken, signin, signup } from '../utils/auth.js';
import { setToken, getToken, removeToken } from '../utils/token.js';
import '../index.css';
import ProtectedRoute from './ProtectedRoute.jsx';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import logo from '../../public/logo.svg';
import Header from './header/Header.jsx';
import Main from './main/Main.jsx';
import Footer from './Footer/Footer.jsx';
import Login from './Auth/Login.jsx';
import Register from './Auth/Register.jsx';
import InfoTooltip from './Main/Popup/InfoTooltip.jsx';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const fetchUser = async () => {
    const userDetails = await api.getUserInfo().then((userRes) => {
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
    } else {
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
  }, []);

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

  function onUpdateAvatar(avatar) {
    api.saveAvatar(avatar).then((user) => setCurrentUser(user)
    );
    handleClosePopup();
  }

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleLogin({ password, email }) {
    setLoginError(null);
    signin({ password, email })
    .then(({token}) => {
      if (token) {
        setToken(token);
        setIsLoggedIn(true);
        setUserEmail(email);
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath, { replace: true });
      }
    })
    .catch((res) => {
      if (res.status === 400) {
        setLoginError("Uno de los campos se rellenó de forma incorrecta");
        return;
      }
      if (res.status === 401) {
        setLoginError("No se ha encontrado al usuario con el correo electrónico especificado o el usuario no está registrado");
        return;
      }

      setPopup(
        {
          children: <InfoTooltip isSuccess={false} />,
          popupId: "failedAuth-popup",
        }
      )
      return;
    });
  };

  function handleRegister({ password, email }) {
    signup({ password, email })
      .then(({ data }) => {

        setCurrentUser({
          email: data.email,
          _id: data._id,
          ...currentUser,
        });

        navigate("/signin", { replace: true });
      })
      .then(() => {
        setPopup(
          {
            children: <InfoTooltip isSuccess={true} />,
            popupId: "successAuth-popup",
          }
        );
      })
      .catch(() => {
        setPopup(
          {
            children: <InfoTooltip isSuccess={false} />,
            popupId: "failedAuth-popup",
          }
        )
      });
  }

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
        userEmail,
        loginError
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
              popup={popup}
              loginError={loginError}>
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
