// TODO: el componente para la autorización de usuarios con las variables de estado necesarias.

// TODO: para almacenar y acceder al token cuando trabajes en un sitio. En visitas repetidas, los usuarios no tendrían por qué iniciar sesión.

// TODO: Comprueba la validez del token al enviar una solicitud al endpoint /users/me.
import { useState } from 'react';
import InfoTooltip from '../Main/Popup/InfoTooltip';

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

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin({ email, password });
  }

  return (
    <div className="auth">
      <h2 className='auth__title'>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='auth__form__input'
          placeholder="Enter Email: hi@example.com"
          pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
