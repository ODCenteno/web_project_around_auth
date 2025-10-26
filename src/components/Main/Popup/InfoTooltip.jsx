// TODO: un componente de ventana modal que informa al usuario si ha sido registrado exitosamente.

const InfoTooltip = (props) => {
  const { isSuccess } = props;

  return (
      <>
        <img src={isSuccess ? 'success-icon.png' : 'error-icon.png'} alt={isSuccess ? 'Registro exitoso' : 'Error en el registro'} />
        <p className="popup__message">{isSuccess ? '¡Correcto! Te estás registrando correctamente' : 'Uy algo salió mal. Por favor, inténtalo de nuevo.'}</p>
      </>
  );
}
export default InfoTooltip;
