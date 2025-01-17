import axios from 'axios';

const BASE_URL = "http://localhost:8000/reservas";

class ReservaService{
    postReserva(id, numHabitacion, reserva){
        return axios.post(`${BASE_URL}/postReserva/${id}/${numHabitacion}`, reserva);


    }
    getAllReservas() {
        return axios.get(`${BASE_URL}/getReserva`);
      }
}

export default new ReservaService(); // Asegúrate de que sea una instancia