export default function ConfirmationPopup(props) {
  const {card, onCardDelete} = props;

  const handleDelete = (e) => {
    e.preventDefault();

    onCardDelete(card);
  }

  return (
    <>
      <button
        type="submit"
        className="button popup__button-submit" id="popup-delete-place-close"
        onClick={handleDelete}>
          Borrar tarjeta
      </button>
    </>
  )
}
