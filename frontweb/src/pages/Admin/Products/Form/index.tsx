import { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Product } from 'types/products';
import { requestBackend } from 'util/requests';
import Select from 'react-select';
import './style.css';
type UrlParans = {
  productId: string;
};

const Form = () => {
  const { productId } = useParams<UrlParans>();
  const isEditing = productId !== 'create';

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Product>();

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/products/${productId}`, withCredentials: true })
        .then((response) => {
          const product = response.data as Product;
          setValue('name', product.name);
          setValue('description', product.description);
          setValue('date', product.date);
          setValue('categories', product.categories);
          setValue('price', product.price);
          setValue('imgUrl', product.imgUrl);
        })
        .catch((error) => {
          console.log('ERRO', error.response);
        });
    }
  }, [productId, setValue, isEditing]);

  const onSubmit = (formData: Product) => {
    const data = {
      ...formData,
      imgUrl: isEditing
        ? formData.imgUrl
        : 'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg',
      categories: isEditing ? formData.categories : [{ id: 1, name: '' }],
    };
    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/products/${productId}` : '/products',
      //data: FormData,
      data, // ou data: data
      withCredentials: true,
    };

    requestBackend(config)
      .then((response) => {
        history.push('/admin/products');
      })
      .catch((error) => {
        console.log('ERRO', error.response);
      });
  };

  const handleCancel = () => {
    history.push('/admin/products');
  };

  return (
    <div className="product-crud-form-card">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-6">
              <div className="product-crud-form-input">
                <input
                  {...register('name', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Nome do produto"
                  name="name"
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>
              <div className="product-crud-form-input">
                <Select
                  options={[{ value: 'chocolate', label: 'chocolate' }]}
                  isMulti
                  classNamePrefix='product-crud-select'
                />
              </div>
              <div className="product-crud-form-input">
                <input
                  {...register('price', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.price ? 'is-invalid' : ''
                  }`}
                  placeholder="Preço"
                  name="price"
                />
                <div className="invalid-feedback d-block">
                  {errors.price?.message}
                </div>
              </div>
            </div>
            <div className="col-lg-6 product-crud-form-input">
              <textarea
                rows={10}
                {...register('description', {
                  required: 'Campo obrigatório',
                })}
                className={`form-control base-input h-auto ${
                  errors.description ? 'is-invalid' : ''
                }`}
                placeholder="Descrição"
                name="description"
              ></textarea>
              <div className="invalid-feedback d-block">
                {errors.description?.message}
              </div>
            </div>
          </div>
          <div className="product-crud-form-buttons">
            <button onClick={handleCancel} className="btn btn-outline-danger">
              CANCELAR
            </button>
            <button className="btn btn-primary text-white">SALVAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
