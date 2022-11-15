import "./notice.scss";

const Notice = () => {
  return (
    <div className="notice-container d-flex justify-content-center col col-8">
      <div className="col-12">
        <input
          className="notice-input col-12 text-center"
          type="text"
          placeholder="¿Tiene algún anuncio importante?"
        />
      </div>
      <div className="notice-wrapper col-12"></div>
    </div>
  );
};

export default Notice;
