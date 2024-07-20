import styles from './book-card.css'

export function BookCard(id,flightId,bookingDate){
    return `
        <div class="${styles.card}">
            <h3>Reserva n°${id}</h3>
            <p><b>Vuelo ID: </b>${flightId}</p>
            <p><b>Reservado el: </b><br>${bookingDate.replace("T"," ")}</p>
        </div>
    `;
}