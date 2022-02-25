import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import ProductPrice from 'components/ProductPrice';
import { Link } from 'react-router-dom';
import './style.css';

const ProductDetails = () => {
  return (
    <div className="product-details-container">
      <div className="base-card product-details-card">
        <Link to="/products">
          <div className="goback-container">
            <ArrowIcon />
            <h1>VOLTAR</h1>
          </div>
        </Link>
        <div className="row">
          <div className="col-xl-6">
            <div className="img-container">
              <img
                src="https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg"
                alt="Nome do Produto"
              />
            </div>
            <div className="name-price-container">
              <h2>Nome do Produto</h2>
              <ProductPrice price={2998.99} />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="description-container">
              <h3>Descrição do Produto</h3>
              <p>descrição do pruduto detalhamento</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
