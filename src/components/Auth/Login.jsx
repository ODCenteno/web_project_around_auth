// TODO: el componente para la autorización de usuarios con las variables de estado necesarias.

// TODO: para almacenar y acceder al token cuando trabajes en un sitio. En visitas repetidas, los usuarios no tendrían por qué iniciar sesión.

// TODO: Comprueba la validez del token al enviar una solicitud al endpoint /users/me.
import { useState } from 'react';
import InfoTooltip from '../Main/Popup/InfoTooltip';
import Popup from '../Main/Popup/Popup'

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authSuccessPopup = {
    title: '¡Correcto! Te estás registrando correctamente',
    children: <InfoTooltip isSuccess={true} />,
    popupId: "successAuth-popup",
  };

  const authFailedPopup = {
    title: "Uy algo salió mal. Por favor, inténtalo de nuevo.",
    children: <InfoTooltip isSuccess={false} />,
    popupId: "failedAuth-popup",
  };

    const handleChange = (e) => {
    const { type, value } = e.target;

    console.log(type, value);
    if (type === 'email') {
      setEmail(value);
    } else if (type === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin({ email, password });
    setEmail('');
    setPassword('');
  }

  return (
    <div className="auth">
      <h2 className='auth__title'>Iniciar sesión</h2>
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
        <button type="submit" className='auth__button'>Login</button>
      </form>
    </div>
  );
}

export default Login;
