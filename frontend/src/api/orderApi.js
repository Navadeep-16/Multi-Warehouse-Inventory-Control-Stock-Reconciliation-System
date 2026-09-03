import api from './axiosClient';

export const placeOrder = async (orderRequest) => {
  try {
    const { data } = await api.post('/orders', orderRequest);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 409) {
       throw new Error(error.response.data.error || "Insufficient stock");
    }
    throw error;
  }
};

export const getOrders = async () => {
  const { data } = await api.get('/orders');
  return data;
};
