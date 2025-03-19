import axios from 'axios';

const BASE_URL = "http://localhost:8000/reservas";

class ReservaService{
    postReserva(id, numHabitacion, reserva){
        return axios.post(`${BASE_URL}/postReserva/${id}/${numHabitacion}`, reserva);
    }
    getReservaByEmailAndNumHabitacion(numHabitacion, email1){
        return axios.get(`${BASE_URL}/getReserva-huesped/${numHabitacion}/${email1}`);

    }
    getAllReservas() {
        return axios.get(`${BASE_URL}/getReserva`);
    }
    getReservasConfirmadas(){
        return axios.get(`${BASE_URL}/getReservasConfirmadas`);
    }
    checkOut(id){
        return axios.put(`${BASE_URL}/checkout/${id}`);
    }

    confirmarReserva(id){
        return axios.put(`${BASE_URL}/confirmarReserva/${id}`);
    }
    eliminarReserva(id){
        return axios.delete(`${BASE_URL}/deleteReserva/${id}`);

    }

}

export default new ReservaService(); 