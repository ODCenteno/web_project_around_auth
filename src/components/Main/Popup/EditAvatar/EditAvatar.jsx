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
          type="url"
          className="popup__input"
          id="form-avatar-src"
          name="link"
          placeholder="Enlace a la imagen: http://..."
          pattern="^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*)(?::\d{2,})?(?:[\/?#]\S*)?$"
          required
          ref={nodeAvatar}>
        </input>
        <span id="form-avatar-src-error" className="popup__span-error"></span>
      </fieldset>
      <button type="submit" className="button popup__button-submit" id="popup-button-avatar-submit"
        >Guardar</button>
    </form>
  )
}
