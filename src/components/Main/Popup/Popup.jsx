export default function Popup(props) {
  const {popupId, onClose, title, children} = props;

  return (
    <aside id={popupId} className="popup">
        <div className={!title ? "popup__zoom-container" : "popup__container" }>
          <button type="reset" className="button popup__button-close" id="popup-button-close" onClick={onClose}></button>
          { title && <h2 className="popup__title">{title}</h2>}
          {children}
        </div>
    </aside>
  )
}
