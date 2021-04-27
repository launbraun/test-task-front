import axios from "axios";


const instance = axios.create({
    baseURL: 'http://localhost:3005/api/products/',
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': true
    }
});


export const productAPI = {
    getAllProducts() {
        return instance.get(``)
            .then(response => {
                return response.data;
            });
    },
    getProduct(id) {
        return instance.get(`` + id)
            .then(response => {
            return response.data;
        })
    }

}






