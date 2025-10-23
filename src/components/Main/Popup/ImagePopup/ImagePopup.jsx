export default function ImagePopup(props) {
  const {name, link} = props.card;

  return (
    <>
      <img className="popup__image" id="zoom-img" src={link} alt={`Image of ${name}`} name={name}></img>
      <figcaption className="popup__figcaption">{name}</figcaption>
    </>
  )
}
//className="popup__zoom-container"
