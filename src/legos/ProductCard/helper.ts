import productImage from '../../assets/productImage.png';

export const productInfo = (productId: number = 1) => ({
  productId,
  price: 200,
  discount: 25,
  title: 'Павербанк',
  rate: 4.9,
  image: productImage,
});
