import axios from 'axios';

const Backend_API = "http://localhost:8080/category";

export const axiosAllCategories = async (id) => {
    id = id || '';
    return await axios.get(Backend_API + '/findAll' + id);
}
export const axiosCategoryGetById = async (id) => {
    id = id || '';
    return await axios.get(Backend_API + '/categoryUsingId/' + id);
}
export const axiosAddCategory = async (category) => {
    return await axios.post(Backend_API + '/addCategory', category);
}
export const axiosUpdateCategory = async (id, category) => {
    return await axios.put(Backend_API + '/updateCategory/' + id, category);
}