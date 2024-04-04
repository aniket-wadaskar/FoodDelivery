import axios from 'axios';

const User_Backend_API = "http://localhost:8080/user";

export const axiosAllUsers = async (id) => {
    id = id || '';
    return await axios.get(User_Backend_API + '/allCustomers/' + id);
}
export const axiosGetUserById = async (id) => {
    id = id || '';
    return await axios.get(User_Backend_API + '/CustomerById/' + id);
}
export const axiosAddUser = async (user) => {
    return await axios.post(User_Backend_API + '/registerCustomer', user);
}

export const axiosUpdateUser = async (id, user) => {
    return await axios.put(User_Backend_API + '/updateCustomer/' + id, user);
}

export const axiosDeleteUser = async (id) => {
    return await axios.delete(User_Backend_API + '/deleteCustomer/' + id);
}
export const axiosGetCart = async (custid) => {
    return await axios.get(User_Backend_API + '/getCart/' + custid);
}