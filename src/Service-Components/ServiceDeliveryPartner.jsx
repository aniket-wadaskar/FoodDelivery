import axios from 'axios';

const DeliveryPartner_API = "http://localhost:8080/deliveryPartner";

export const axiosAddDeliveryPartner = async (deliveryPartner) => {
    return await axios.post(DeliveryPartner_API + '/add', deliveryPartner);
};

export const axiosUpdateDeliveryPartner = async (id, deliveryPartner) => {
    return await axios.put(DeliveryPartner_API + '/update/' + id, deliveryPartner);
};

export const axiosDeleteDeliveryPartner = async (id) => {
    return await axios.delete(DeliveryPartner_API + '/delete/' + id);
};

export const axiosGetDeliveryPartnerById = async (id) => {
    return await axios.get(DeliveryPartner_API + '/getById/' + id);
};

export const axiosGetAllDeliveryPartners = async () => {
    return await axios.get(DeliveryPartner_API + '/findAll');
};

