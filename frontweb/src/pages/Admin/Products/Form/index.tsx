import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Product } from 'types/products';
import { requestBackend } from 'util/requests';
import Select from 'react-select';
import { Category } from 'types/category';
import CurrencyInput from 'react-currency-input-field';
import './styles.css';

type UrlParans = {
  productId: string;
};

const Form = () => {
  const { productId } = useParams<UrlParans>();
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  const isEditing = productId !== 'create';

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Product>();

  useEffect(() => {
    requestBackend({ url: '/categories' }).then((response) => {
      setSelectCategories(response.data.content);
    });
  }, []);

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
    const data = {...formData, price: String(formData.price).replace(',','.')};
    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/products/${productId}` : '/products',
      data,
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
    <div className="product-crud-container">
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
                <Controller
                  name="categories"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={selectCategories}
                      isMulti
                      classNamePrefix='product-crud-select'
                      getOptionLabel={(category) => category.name}
                      getOptionValue={(category) => String(category.id)}
                    />
                  )}
                />
                {errors.categories && (
                  <div className="invalid-feedback d-block">
                    Campo obrigatório
                  </div>
                )}
              </div>
              <div className="product-crud-form-input">
                <input
                  {...register('imgUrl', {
                    required: 'Campo obrigatório',
                    pattern: {
                        value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                        message: 'URL inválida'
                      }
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.imgUrl ? 'is-invalid' : ''
                  }`}
                  placeholder="URL da imagem do produto"
                  name="imgUrl"
                />
                <div className="invalid-feedback d-block">
                  {errors.imgUrl?.message}
                </div>
              </div>
              <div className="product-crud-form-input">
                  <Controller
                    name='price'
                    control={control}
                    rules={{required: 'Campo obrigatório'}}
                    render={({field}) => (
                        <CurrencyInput
                            placeholder='Preço'
                            className={`form-control base-input ${
                                errors.price ? 'is-invalid' : ''
                              }`}
                            disableGroupSeparators={true}          
                            value={field.value}
                            onValueChange={field.onChange}
                            decimalScale={2}
                            decimalsLimit={2}
                            disableAbbreviations={true}
                        />
                    )}
                  />
                <div className="invalid-feedback d-block">
                  {errors.price?.message}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
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
