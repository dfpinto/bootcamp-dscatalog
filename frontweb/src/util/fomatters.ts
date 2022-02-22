export const formatPrice = (price: number) => {
    const params = {maxinumFractionDigits:2, minimumFractionDigits: 2};
    return new Intl.NumberFormat('pt-BR', params).format(price);
}