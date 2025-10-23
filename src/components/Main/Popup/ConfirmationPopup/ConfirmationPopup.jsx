export default function ConfirmationPopup(props) {
  const {card, onCardDelete} = props;

  return (
    <>
      <button
        type="submit"
        className="button popup__button-submit" id="popup-delete-place-close"
        onClick={() => onCardDelete(card)}>
          Borrar tarjeta
      </button>
    </>
  )
}
