// TODO: un componente de ventana modal que informa al usuario si ha sido registrado exitosamente.
import successIcon from '../../../images/register-success.png';
import errorIcon from '../../../images/register-error.png';

const InfoTooltip = (props) => {
  const { isSuccess } = props;

  return (
      <div className='auth__popup-container'>
        <img className='auth__register-popup--success-icon' src={isSuccess ? successIcon : errorIcon} alt={isSuccess ? 'Ícono de registro exitoso' : 'Error en el registro'} />
        <p className="popup__title-tooltip">{isSuccess ? '¡Correcto! Ya te has registrado' : 'Uy algo salió mal. Por favor, inténtalo de nuevo.'}</p>
      </div>
  );
}
export default InfoTooltip;
