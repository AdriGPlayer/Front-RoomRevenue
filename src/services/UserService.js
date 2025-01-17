import axios from "axios";

const BASE_URL = "http://localhost:8000/users";

class UserService{
    getUserType(userType){
        return axios.get(`${BASE_URL}/getUserByType/${userType}`);
    }
    getUserById(id){
        return axios.get(`${BASE_URL}/getUser/${id}`);
    }
    addUser(user){
        return axios.post(`${BASE_URL}/postUser`, user);
    }
    updateUser(id, user){
        return axios.put(`${BASE_URL}/updateUser/${id}`, user);
    }
    deleteUSer(id){
        return axios.delete(`${BASE_URL}/deleteUser/${id}`)
    }


}
export default new UserService();