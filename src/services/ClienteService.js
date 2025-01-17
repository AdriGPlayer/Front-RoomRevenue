import axios from 'axios';

const BASE_URL = "http://localhost:8000/clientes";

class ClienteService {
    postCliente(cliente){
        return axios.post(`${BASE_URL}/saveCliente`, cliente);

    }

    getByEmail(email) {
        return axios.get(`${BASE_URL}/getClientePorEmail/${email}`);
    }

    


}

export default new ClienteService();