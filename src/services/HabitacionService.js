import axios from "axios";

const BASE_URL = "http://localhost:8000/habitacion";

class HabitacionService{
    getAllHabitaciones(){
       return axios.get(`${BASE_URL}/getHabitacion`);
    }
    getHabitacionByNumHabitacion(numHabitacion){
        return axios.get(`${BASE_URL}/getHabitacion/${numHabitacion}`);
    }
    getHabitacionesLimpias(){
        return axios.get(`${BASE_URL}/getHabtacionesLimpias`);
    }
    updateHabitacion(id, habitacion) {
        return axios.put(`${BASE_URL}/putHabitacion/${id}`, habitacion);
      }


}
export default new HabitacionService();