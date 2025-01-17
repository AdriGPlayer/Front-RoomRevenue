import axios from "axios";

const URL_LOGIN = "http://localhost:8000/login";

class AuthService {
  login(usuario, contraseña) {
    return axios.post(URL_LOGIN, { user: usuario, password: contraseña }); 
  }
}

export default new AuthService();