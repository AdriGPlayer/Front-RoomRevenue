import { useState, useEffect } from "react";
import HabitacionService from "../../../../services/HabitacionService";

export default function GestionHabitaciones() {
  const [rooms, setRooms] = useState([]);
  const statuses = [
    "VACIA_LIMPIA",
    "VACIA_SUCIA",
    "OCUPADA_LIMPIA",
    "OCUPADA_SUCIA",
    "MANTENIMIENTO",
  ];

  // Cargar habitaciones desde el backend al montar el componente
  useEffect(() => {
    HabitacionService.getAllHabitaciones()
      .then((response) => {
        const habitaciones = response.data.map((habitacion) => ({
          id: habitacion.id, // Agregamos el ID de la habitación
          number: habitacion.numHabitacion,
          type: habitacion.tipoHabitacion,
          status: habitacion.estado,
        }));
        setRooms(habitaciones);
      })
      .catch((error) => {
        console.error("Error al obtener las habitaciones:", error);
      });
  }, []);

  // Actualizar estado en frontend y enviar cambio al backend
  const updateRoomStatus = (roomNumber, newStatus) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.number === roomNumber ? { ...room, status: newStatus } : room
      )
    );
  };

  const handleStatusChange = (roomId, newStatus) => {
    const roomToUpdate = rooms.find((room) => room.id === roomId);
    if (!roomToUpdate) return;

    const updatedRoom = { ...roomToUpdate, estado: newStatus };

    HabitacionService.updateHabitacion(roomId, updatedRoom)
      .then(() => {
        setRooms((prevRooms) =>
          prevRooms.map((room) =>
            room.id === roomId ? { ...room, status: newStatus } : room
          )
        );
      })
      .catch((error) =>
        console.error("Error al actualizar la habitación:", error)
      );
  };

  return (
    <div className="main-content">
      <h1>Gestión de Habitaciones</h1>
      <div className="main-content table-container table-container-expand">
        <table id="roomTable">
          <thead>
            <tr>
              <th>Número de Habitación</th>
              <th>Tipo de Habitación</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.number}</td>
                <td>{room.type}</td>
                <td>
                  <select
                    value={room.status}
                    onChange={(e) =>
                      updateRoomStatus(room.number, e.target.value)
                    }
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className="asignar"
                    onClick={() => handleStatusChange(room.id, room.status)}
                  >
                    Cambiar Estado
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
