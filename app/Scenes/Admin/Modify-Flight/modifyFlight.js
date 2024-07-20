import { navigateTo } from "../../../Router";
import { Navbar } from "../../../Components/navbar/navbar";
import styles from './modify-flight.css';

export async function ModifyFlightScene(){
    const response = await fetch(`http://localhost:3000/users?id=${localStorage.getItem('token')}`);
    const loggedUser = await response.json();
    const searchParams = new URLSearchParams(window.location.search);
    const flightId = searchParams.get('id');
    const response2 = await fetch(`http://localhost:3000/flights?id=${flightId}`);
    const flight = await response2.json();
    console.log(flight);
    const root=document.querySelector('#root');
    root.innerHTML=`
        ${Navbar(loggedUser[0].name,loggedUser[0].role)}
        <form class="${styles.form}">
            <h2>Modificar Vuelo</h2>
            <input id="number" type="text" value="Número del vuelo: ${flight[0].number}" disabled></input>
            <input id="origin" type="text" value="Origen: ${flight[0].origin}" disabled></input>
            <input id="destination" type="text" value="Destino: ${flight[0].destination}" disabled></input>
            <span>
                <label for="departure">Fecha y Hora de Salida</label>
                <input id="departure" type="datetime-local" value="${flight[0].departure}"></input>
            </span>
            <span>
                <label for="arrival">Fecha y Hora de Llegada</label>
                <input id="arrival" type="datetime-local" value="${flight[0].arrival}"></input>
            </span>
            <input id="capacity" type="number" value="${flight[0].capacity}"></input>
            <button type="submit">Modificar</button>
        </form>
    `;

    //logica
    const $departure=root.querySelector('#departure');
    const $arrival=root.querySelector('#arrival');
    const $capacity=root.querySelector('#capacity');
    const $form=root.querySelector('form');
    $form.addEventListener('submit',async (event)=>{
        event.preventDefault();
        if(!$departure||!$arrival||!$capacity){
            alert("Por favor rellena todos los campos");
            return;
        }
        try{
            await fetch(`http://localhost:3000/flights/${flightId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'departure': $departure.value,
                    'arrival': $arrival.value,
                    'capacity': $capacity.value,
                })
            });
            $form.reset();
            alert("Vuelo modificado exitosamente!");
            navigateTo('/login');
        }catch(error){
            alert("Ocurrió un error "+error);
        }
    });
}