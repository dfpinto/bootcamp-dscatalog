import { render, screen } from "@testing-library/react";
import { setUncaughtExceptionCaptureCallback } from "process";
import { Product } from "types/products";
import ProductCard from "..";

test('should render ProductCard', () => {
    const price = 10.1;
    const product : Product = {
        name:'Computador',
        price: 2345.67,
        imgUrl: ''
    } as Product;

    render(
        <ProductCard product={product}/>
    )

    expect(screen.getByText('R$')).toBeInTheDocument();
    expect(screen.getByText('2.345,67')).toBeInTheDocument();
    expect(screen.getByAltText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
})