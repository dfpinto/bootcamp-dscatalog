import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import { AxiosRequestConfig } from 'axios';
import ProductPrice from 'components/ProductPrice';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Product } from 'types/products';
import { requestBackend } from 'util/requests';
import ProductDetailsInfo from './ProductDetailsInfo';
import ProductDetailsLoader from './ProductDetailsLoader';
import './style.css';

type UrlParams = {
  productId: string;
};

const ProductDetails = () => {
  const { productId } = useParams<UrlParams>();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/products/${productId}`,
    };
    setIsLoading(true);
    requestBackend(params)
      .then((response) => {
        setProduct(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

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
            {isLoading ? (
              <ProductDetailsInfo />
            ) : (
              <>
                <div className="img-container">
                  <img src={product?.imgUrl} alt={product?.name} />
                </div>
                <div className="name-price-container">
                  <h2>{product?.name}</h2>
                  {product && <ProductPrice price={product?.price} />}
                </div>
              </>
            )}
          </div>
          <div className="col-xl-6">
            {isLoading ? (
              <ProductDetailsLoader />
            ) : (
              <div className="description-container">
                <h3>Descrição do Produto</h3>
                <p>{product?.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
