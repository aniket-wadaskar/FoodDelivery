import axios from 'axios';

const Backend_API = "http://localhost:8080/orders";

export const axiosGetOrdersByCustId = async (id) => {
    id = id || '';
    return await axios.get(Backend_API + '/findBycustId/' + id);
}

export const axiosPlaceOrder = async (custid) => {
    return await axios.post(Backend_API + '/placeOrder/' + custid);
}

export const axiosGetItemsOrderId = async (id) => {
    id = id || '';
    return await axios.get(Backend_API + '/find/' + id);
}
export const axiosGetAllOrders = async (id) => {
    id = id || '';
    return await axios.get(Backend_API + '/findall/' + id);
}
export const updateOrderStatus = async (orderId) => {
  try {
    // Send a PUT request to the backend endpoint with the orderId
    const response = await axios.put(`${Backend_API}/status/${orderId}`);
   
    // Return the response data (optional)
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error updating order status:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const updateOrderToDelivered = async (orderId) => {
  try {
    // Send a PUT request to the backend endpoint with the orderId
    const response = await axios.put(`${Backend_API}/status1/${orderId}`);
   
    // Return the response data (optional)
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error updating order status:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
