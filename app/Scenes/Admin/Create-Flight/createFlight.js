import { navigateTo } from "../../../Router";
import { Navbar } from "../../../Components/navbar/navbar";
import styles from './create-flight.css';

export async function CreateFlightScene(){
    const response = await fetch(`http://localhost:3000/users?id=${localStorage.getItem('token')}`);
    const loggedUser = await response.json();
    const root=document.querySelector('#root');
    root.innerHTML=`
        ${Navbar(loggedUser[0].name,loggedUser[0].role)}
        <form class="${styles.form}">
            <h2>Crear Vuelo</h2>
            <input id="number" type="text" placeholder="Número del vuelo" maxlength="20"></input>
            <input id="origin" type="text" placeholder="Ciudad de origen" maxlength="50"></input>
            <input id="destination" type="text" placeholder="Ciudad de destino" maxlength="50"></input>
            <span>
                <label for="departure">Fecha y Hora de Salida</label>
                <input id="departure" type="datetime-local"></input>
            </span>
            <span>
                <label for="arrival">Fecha y Hora de Llegada</label>
                <input id="arrival" type="datetime-local"></input>
            </span>
            <input id="capacity" type="number" placeholder="Capacidad del vuelo"></input>
            <button type="submit">Crear</button>
        </form>
    `;

    //logica
    const $number=root.querySelector('#number');
    const $origin=root.querySelector('#origin');
    const $destination=root.querySelector('#destination');
    const $departure=root.querySelector('#departure');
    const $arrival=root.querySelector('#arrival');
    const $capacity=root.querySelector('#capacity');
    const $form=root.querySelector('form');
    $form.addEventListener('submit',async (event)=>{
        event.preventDefault();
        if(!number||!origin||!$destination||!$departure||!$arrival||!$capacity){
            alert("Por favor rellena todos los campos");
            return;
        }
        try{
            await fetch('http://localhost:3000/flights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'number': $number.value,
                    'origin': $origin.value,
                    'destination': $destination.value,
                    'departure': $departure.value,
                    'arrival': $arrival.value,
                    'capacity': $capacity.value,
                })
            });
            $form.reset();
            alert("Vuelo creado exitosamente!");
            navigateTo('/login');
        }catch(error){
            alert("Ocurrió un error "+error);
        }
    });
}