import { Navbar } from "../../../Components/navbar/navbar";
import { FlightCard } from "../../../Components/flight-card/flightCard";
import { BookCard } from "../../../Components/book-card/bookCard";
import { navigateTo } from "../../../Router";
import moment from "moment";
import styles from './dashboard.css'

export async function DashboardScene(){
    const response = await fetch(`http://localhost:3000/users?id=${localStorage.getItem('token')}`);
    const loggedUser = await response.json();
    const response2 = await fetch("http://localhost:3000/flights");
    const flights = await response2.json();
    const response3 = await fetch("http://localhost:3000/bookings");
    const bookings = await response3.json();
    const bookingsContainer=(loggedUser[0].role=="user")?`
        <div>
            <h2 style="padding:10px;text-align:center;font-size:3rem">Reservas</h2>
            <div id="bookings" class="${styles.layout}"></div>
        </div>
    `:'';
    const root = document.querySelector('#root');
    root.innerHTML=`
        ${Navbar(loggedUser[0].name,loggedUser[0].role)}
        <h2 style="padding:10px;text-align:center;font-size:3rem">Vuelos disponibles</h2>
        <div id="layout" class="${styles.layout}"></div>
        ${bookingsContainer}
    `;
    //logica
    const $logoutBtn=document.querySelector('#logout');
    $logoutBtn.addEventListener('click',()=>{
        localStorage.removeItem("token");
        navigateTo('/login');
    });
    const $layout=document.querySelector("#layout");
    let addCards="";
    flights.forEach(flight => {
        addCards+=FlightCard(flight.id,flight.number,flight.origin,flight.destination,flight.departure,flight.arrival,flight.capacity,loggedUser[0].role);
    });
    $layout.innerHTML=`
        ${addCards}
    `;
    if(loggedUser[0].role==='admin'){
        async function deleteFligtht(id){
            await fetch(`http://localhost:3000/flights/${id}`, {method: 'DELETE'});
        }
        const $createFlightBtn=document.querySelector('#createFlight');
        $createFlightBtn.addEventListener('click',()=>{
            navigateTo('/create-flight');
        });
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener('click', (e) => {
                navigateTo(`/modify-flight?id=${e.currentTarget.id}`);
            });
        });
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener('click', (e) => {
                deleteFligtht(e.currentTarget.id);
                navigateTo('/dashboard')
            });
        });
    }else if(loggedUser[0].role==='user'){
        async function postBook(flightId,flightNumber,userId,bookingDate){
            await fetch('http://localhost:3000/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'flightId': flightId,
                    'flightNumber': flightNumber,
                    'userId':userId,
                    'bookingDate': bookingDate,
                })
            });
        }
        
        const $bookings=document.querySelector('#bookings');
        let addBook="";
        const response4 = await fetch("http://localhost:3000/users?id=d86a&_embed=bookings");
        const userBooks = await response4.json();
        userBooks[0].bookings.forEach(book => {
                addBook+=`
                        ${BookCard(book.id,book.flightId,book.bookingDate)}
                `;
        });
        $bookings.innerHTML=`
            ${addBook}
        `;
        document.querySelectorAll(".book-btn").forEach(btn => {
            btn.addEventListener('click', (e) => {
                postBook(e.currentTarget.id,e.currentTarget.number,localStorage.getItem('token'),moment().format('YYYY-MM-DD hh:mm'));
                navigateTo('/dashboard');
            });
        });
    }
}