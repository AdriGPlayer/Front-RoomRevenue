export default function DetallesForm() {
  return (
    <>
      <div className="huesped-form">
        <div className="huesped-form-group">
          <label className="huesped-label">Instrucciones especiales:</label>
          <textarea
            className="huesped-textarea"
            id="room-service-notes"
            placeholder="Indique cualquier preferencia o alergia..."
          ></textarea>
        </div>
        <div className="huesped-form-group">
          <label className="huesped-label">Hora de entrega:</label>
          <input
            className="huesped-input time"
            type="time"
            id="room-service-time"
          />
        </div>
        <button className="huesped-submit">Confirmar Pedido</button>
      </div>
    </>
  );
}
