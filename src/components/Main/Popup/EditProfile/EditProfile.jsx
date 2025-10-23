import { useState, useContext } from 'react';
import CurrentUserContext from '../../../../contexts/CurrentUserContext.js';

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateUser({ name, about: description });
  };


  return (
    <form id="form-profile" className="popup__form" name="edit-form" action="/" method="post" noValidate onSubmit={handleSubmit}>
      <fieldset className="popup__fields">
        <input type="text" className="popup__input" id="popup-input-name" name="name" placeholder="Nombre" minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
          required></input>
        <span id="popup-input-name-error" className="popup__span-error"></span>
        <input type="text" className="popup__input" id="popup-input-description" name="description" minLength="2"
          maxLength="200"
          placeholder="Acerca de mí"
          value={description}
          onChange={handleDescriptionChange}
          required></input>
        <span id="popup-input-description-error" className="popup__span-error"></span>
      </fieldset>
      <button type="submit" className="button popup__button-submit" id="popup-button-profile-submit"
        >Guardar</button>
    </form>
  )
}
