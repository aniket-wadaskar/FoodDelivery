import axios from 'axios';

const Backend_API = "http://localhost:8080/cart";

export const axiosCart = async (id) => {
    id = id || '';
    return await axios.get(Backend_API + '/' + id);
}

export const axiosAddToCart = async (custid, productid) => {
    return await axios.post(Backend_API + '/add/' + custid + '/' + productid);
}
export const axiosDeleteProductCart = async (custid, productid) => {
    return await axios.delete(Backend_API + '/deleteProducts/' + custid + '/' + productid);
}
