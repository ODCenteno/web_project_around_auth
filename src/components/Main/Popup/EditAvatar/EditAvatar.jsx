import { useContext, useRef } from 'react';
import CurrentUserContext from '../../../../contexts/CurrentUserContext.js';

export default function EditAvatar() {
  const userContext = useContext(CurrentUserContext);
  const { onUpdateAvatar } = userContext;

  const nodeAvatar = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: nodeAvatar.current.value,
    });
  }

  return (
    <form id="form-avatar" className="popup__form" name="avatar" action="/" method="post" noValidate onSubmit={handleSubmit}>
      <fieldset className="popup__fields">
        <input
          type="text"
          className="popup__input"
          id="form-avatar-src"
          name="link" pattern="https://.*"
          placeholder="Enlace a la imagen: http://..." required
          ref={nodeAvatar}>
        </input>
        <span id="form-avatar-src-error" className="popup__span-error"></span>
      </fieldset>
      <button type="submit" className="button popup__button-submit" id="popup-button-avatar-submit"
        >Guardar</button>
    </form>
  )
}
