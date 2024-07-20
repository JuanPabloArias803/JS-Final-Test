import styles from './flight-card.css'

export function FlightCard(id,number,origin,destination,departure,arrival,capacity,userRole){
    const role=(userRole=="admin")?' (admin)':'';
    const editFlight=(userRole=="admin")?`<button class="edit-btn" id="${id}">Editar</button>`:'';
    const deleteFlight=(userRole=="admin")?`<button class="delete-btn" id="${id}">Eliminar</button>`:'';
    const bookFlight=(userRole=="user")?`<button class="book-btn" id="${id}">Reservar</button>`:'';
    return `
        <div class="${styles.card}">
            <h3>Vuelo n°${number}</h3>
            <p><b>Origen: </b><br>${origin}</p>
            <p><b>Destino: </b><br>${destination}</p>
            <p><b>Fecha de salida: </b><br>${departure.replace("T"," ")}</p>
            <p><b>Fecha de llegada: </b><br>${arrival.replace("T"," ")}</p>
            <p><b>Tiquetes disponibles: </b><br>${capacity}</p>
            <span>
                ${editFlight}
                ${deleteFlight}
                ${bookFlight}
            </span>
        </div>
    `;
}