// TODO: el componente para el registro de los usuarios con las variables de estado necesarias.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoTooltip from '../Main/Popup/InfoTooltip.jsx';
import Popup from '../Main/Popup/Popup.jsx';
// TODO: import RegisterPop from '';

const Register = ({ handleRegister, popup, onOpenPopup,onClosePopup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { type, value } = e.target;

    if (type === 'email') {
      setEmail(value);
    } else if (type === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleRegister({ password, email });
  }

  return (
    <div className="auth">
      <h2 className='auth__title'>Regístrate</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleChange}
          className='auth__form__input'
          placeholder="Enter Email: hi@example.com"
          pattern='^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$'
          required
        />
        <input
          type="password"
          value={password}
          onChange={handleChange}
          className='auth__form__input'
          placeholder="Enter Password"
          required
        />
        <button type="submit" className='auth__button'>Register</button>
      </form>
      {popup && (
        <Popup
          popupId={popup.popupId}
          onClose={onClosePopup}
          title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </div>
  );
}

export default Register;
