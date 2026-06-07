import charminar from "./assets/images/charminar.jpg";

function LeftPanel({ title, description }) {
  return (
    <div className="left-panel">
      <img src={charminar} alt="Travel" className="travel-image" />
      <div className="overlay">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default LeftPanel;
