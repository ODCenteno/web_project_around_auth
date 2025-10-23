import { useState } from "react";
import Popup from "../../Popup/Popup.jsx";
import ImagePopup from "../../Popup/ImagePopup/ImagePopup.jsx";
import heart from '../../../../images/heart.svg'
import likeHeart from '../../../../images/heart-liked.svg'
import ConfirmationPopup from "../../Popup/ConfirmationPopup/ConfirmationPopup.jsx";

export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const [popup, setPopup] = useState(null);
  const [like, setLike] = useState(isLiked);
  const [clicks, setClicks] = useState(0);

  const { card, onCardLike, onCardDelete } = props;

  const imagePopup = {
      children: <ImagePopup card={card}/>,
      popupId: "popup__img-zoom",
    };

  const confirmationPopup = {
      title: "¿Estás seguro/a?",
      children: <ConfirmationPopup card={card} onCardDelete={onCardDelete}/>,
      popupId: "popup__confirmation",
    };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null)
  }

  function handleLikeClick(popup) {
    setClicks(clicks + 1);
    handleOpenPopup(popup);
  }

  const handleDeleteClick = (popup) => {
    setPopup(popup);
  }

  return (
    <li className="card articles__card">
      <img className="card__delete-icon" src='../../../../public/images/delete.svg'
        alt="delete icon" id="delete" onClick={() => {
          handleDeleteClick(confirmationPopup)
        }}></img>
      <picture className="card__picture">
        <img className="card__image" src={link}
          alt={`image of ${name}`} data-orientation="horizontal" onClick={(e) => {
            e.stopPropagation();
            handleOpenPopup({...imagePopup, link: e.target.src})}
          }></img>
      </picture>
      <div className="card__place-info">
        <h3 className="card__place-title">{name}</h3>
        <div className="card__icon-container">
          <img className="card__like-icon" src={like ? likeHeart : heart} alt="like icon" onClick={() => {
            handleLikeClick();
            onCardLike(card);
            setLike(!like);
          }}></img>
        </div>
      </div>
      {popup && (
        <Popup
            popupId={popup.popupId}
            onClose={handleClosePopup}
            title={popup.title}
            onCardDelete={popup.onCardDelete}>
          {popup.children}
        </Popup>
      )}
    </li>
  )
}
