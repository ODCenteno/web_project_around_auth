import { useState, useContext } from 'react';
import CurrentUserContext from '../../../../contexts/CurrentUserContext.js';

export default function NewCard() {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const userContext = useContext(CurrentUserContext);
  const { handleAddPlaceSubmit } = userContext;

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleAddPlaceSubmit({name, link});
  };

  return (
    <form
      id="form-place"
      className="popup__form"
      name="edit-form"
      action="/"
      method="post"
      onSubmit={handleSubmit}
      noValidate>
      <fieldset className="popup__fields">
        <input
          type="text"
          className="popup__input" id="popup-input-title"
          name="title"
          placeholder="Título"
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
          required></input>
        <span id="popup-input-title-error" className="popup__span-error"></span>
        <input
          type="text"
          className="popup__input"
          id="form-img-src"
          name="link"
          pattern="https://.*"
          placeholder="Enlace a la imagen: http://..."
          value={link}
          onChange={handleLinkChange}
          required></input>
        <span id="form-img-src-error" className="popup__span-error"></span>
      </fieldset>
      <button type="submit" className="button popup__button-submit" id="popup-button-place-submit"
      >Guardar</button>
    </form>
  )
}
