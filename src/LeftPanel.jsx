import charminar from "./assets/images/charminar.jpg";

function LeftPanel({ title, description }) {
  return (
    <div className="left-panel-bg col-5 d-none d-md-block">
      <img src={charminar} alt="Travel" className="panel-img" />
      <div className="panel-overlay d-flex flex-column justify-content-center align-items-center text-center text-white p-5">
        <h1 className="display-5 fw-bold mb-3">{title}</h1>
        <p className="fs-5 lh-base" style={{ maxWidth: '400px' }}>{description}</p>
      </div>
    </div>
  );
}

export default LeftPanel;
