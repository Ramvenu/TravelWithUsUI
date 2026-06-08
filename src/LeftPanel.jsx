import charminar from "./assets/images/charminar.jpg";

function LeftPanel({ title, description }) {
  return (
<<<<<<< HEAD
    <div className="left-panel-bg col-5 d-none d-md-block">
      <img src={charminar} alt="Travel" className="panel-img" />
      <div className="panel-overlay d-flex flex-column justify-content-center align-items-center text-center text-white p-5">
        <h1 className="display-5 fw-bold mb-3">{title}</h1>
        <p className="fs-5 lh-base" style={{ maxWidth: '400px' }}>{description}</p>
=======
    <div className="auth-left">
      <img src={charminar} alt="Travel" className="travel-image" />
      <div className="overlay">
        <h1>{title}</h1>
        <p>{description}</p>
>>>>>>> be9a2dd477809db787db02d5762bdd08a03ce316
      </div>
    </div>
  );
}

export default LeftPanel;
