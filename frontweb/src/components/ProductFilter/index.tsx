import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Category } from 'types/category';
import { requestBackend } from 'util/requests';
import Select from 'react-select';
import './styles.css';

type ProductFilterData = {
  name: string;
  category: Category;
};

const ProductFilter = () => {
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  const { register, handleSubmit, control } = useForm<ProductFilterData>();

  useEffect(() => {
    requestBackend({ url: '/categories' }).then((response) => {
      setSelectCategories(response.data.content);
    });
  }, []);

  const onSubmit = (formData: ProductFilterData) => {
    console.log('envio', formData);
  };

  return (
    <div className="base-card product-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="produtct-filter-form">
        <div className="product-filter-name-container">
          <input
            {...register('name')}
            type="text"
            className={'form-control'}
            placeholder="Nome do produto"
            name="name"
          />
          <button>
            <SearchIcon />
          </button>
        </div>
        <div className="product-filter-button-container">
          <div className="product-filter-category-container">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectCategories}
                  isClearable
                  classNamePrefix="product-crud-select"
                  getOptionLabel={(category) => category.name}
                  getOptionValue={(category) => String(category.id)}
                />
              )}
            />
          </div>
          <button className="btn btn-outline-secondary">LIMPAR</button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;
