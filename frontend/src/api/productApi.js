import api from './axiosClient';

export const getProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};

export const createProduct = async (product) => {
  const { data } = await api.post('/products', product);
  return data;
};

export const updateProduct = async (id, product) => {
  const { data } = await api.put(`/products/${id}`, product);
  return data;
};

export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};
