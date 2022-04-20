import './style.css';

const Form = () => {
  return (
    <div className="product-crud-form-card">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>
        <form action="">
          <div className="row">
            <div className="col-lg-6">
              <div className="product-crud-form-input">
                <input className="form-control base-input" type="text" />
              </div>
              <div className="product-crud-form-input">
                <input className="form-control base-input" type="text" />
              </div>
              <div className="product-crud-form-input">
                <input className="form-control base-input" type="text" />
              </div>
            </div>
            <div className="col-lg-6 product-crud-form-input">
              <textarea
                className="form-control base-input h-auto"
                name=""
                rows={10}
              ></textarea>
            </div>
          </div>
          <div className="product-crud-form-buttons">
            <button className="btn btn-outline-danger">CANCELAR</button>
            <button className="btn btn-primary text-white">SALVAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
