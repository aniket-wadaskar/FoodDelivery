import axios from 'axios';

const Admin_Backend_API = "http://localhost:8080/admin";

export const axiosAllAdmins = async (id) => {
    id = id || '';
    return await axios.get(Admin_Backend_API + '/' + id);
}





