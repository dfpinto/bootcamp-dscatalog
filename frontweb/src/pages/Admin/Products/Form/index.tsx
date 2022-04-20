import './style.css';

const Form = () => {
  return (
    <div className="product-crud-card">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>
        <form action="">
            <div className="row">
                <div className="col-lg-6">
                    <input className="form-control base-input" type="text" />
                    <input className="form-control base-input" type="text" />
                    <input className="form-control base-input" type="text" />
                </div>
                <div className="col-lg-6">
                    <textarea className="form-control base-input" name="" rows={10}></textarea>
                </div>
            </div>
            <div>
                <button className="btn btn-outline-danger">CANCELAR</button>
                <button className="btn btn-primary">SALVAR</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
